-- ============================================================
-- RealU Waitlist — Initial Schema
-- Migration: 001_create_waitlist.sql
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- waitlist_users table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.waitlist_users (
  -- Identity
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Personal info
  name                 TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 60),
  email                TEXT NOT NULL UNIQUE CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  username             TEXT NOT NULL UNIQUE CHECK (username ~* '^[a-z0-9_]{3,24}$'),

  -- Onboarding data
  primary_goal         TEXT CHECK (
    primary_goal IN ('focus', 'discipline', 'relationships', 'productivity', 'mental_health', 'confidence', 'other')
  ),
  addiction_types      TEXT[] DEFAULT '{}',
  struggles            TEXT CHECK (char_length(struggles) <= 500),
  motivation           TEXT CHECK (char_length(motivation) <= 1000),
  future_vision        TEXT CHECK (char_length(future_vision) <= 1000),

  -- Referral system
  referral_code        TEXT NOT NULL UNIQUE CHECK (referral_code ~* '^[0-9A-Za-z]{6,12}$'),
  referred_by          TEXT REFERENCES public.waitlist_users (referral_code)
                         ON DELETE SET NULL
                         ON UPDATE CASCADE
                         DEFERRABLE INITIALLY DEFERRED,
  referral_count       INTEGER NOT NULL DEFAULT 0 CHECK (referral_count >= 0),

  -- Waitlist management
  waitlist_position    INTEGER UNIQUE,
  onboarding_complete  BOOLEAN NOT NULL DEFAULT FALSE,
  status               TEXT NOT NULL DEFAULT 'waitlist'
                         CHECK (status IN ('waitlist', 'early_access', 'launched')),

  -- Flexible metadata for future use
  metadata             JSONB DEFAULT '{}'
);

-- ============================================================
-- Indexes for performance
-- ============================================================
CREATE INDEX idx_waitlist_users_email           ON public.waitlist_users (email);
CREATE INDEX idx_waitlist_users_username        ON public.waitlist_users (username);
CREATE INDEX idx_waitlist_users_referral_code   ON public.waitlist_users (referral_code);
CREATE INDEX idx_waitlist_users_referred_by     ON public.waitlist_users (referred_by);
CREATE INDEX idx_waitlist_users_status          ON public.waitlist_users (status);
CREATE INDEX idx_waitlist_users_waitlist_pos    ON public.waitlist_users (waitlist_position);
CREATE INDEX idx_waitlist_users_created_at      ON public.waitlist_users (created_at DESC);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE public.waitlist_users ENABLE ROW LEVEL SECURITY;

-- Public can insert (sign up) but cannot read other users' data
CREATE POLICY "Anyone can sign up"
  ON public.waitlist_users
  FOR INSERT
  WITH CHECK (true);

-- Users cannot read each other's data
-- Only the service role (used by server actions) can read all rows
CREATE POLICY "Service role can read all"
  ON public.waitlist_users
  FOR SELECT
  USING (
    -- auth.role() = 'service_role' is handled automatically when using service key
    -- This policy blocks anon/authenticated reads (you can relax if needed)
    FALSE
  );

-- Only service role can update (for referral count, status changes)
CREATE POLICY "Service role can update"
  ON public.waitlist_users
  FOR UPDATE
  USING (FALSE);

-- Supabase service role bypasses RLS by default when using service key
-- The above policies block the anon/public client while server actions
-- using the service key can read/write freely.
