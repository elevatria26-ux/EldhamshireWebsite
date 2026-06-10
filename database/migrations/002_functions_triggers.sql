-- ============================================================
-- RealU Waitlist — Functions & Triggers
-- Migration: 002_functions_triggers.sql
-- Run after: 001_create_waitlist.sql
-- ============================================================

-- ============================================================
-- Function: get_waitlist_count
-- Returns total number of waitlist signups
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_waitlist_count()
RETURNS BIGINT
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COUNT(*) FROM public.waitlist_users;
$$;

-- ============================================================
-- Function: increment_referral_count
-- Safely increments referral_count for a user by referral_code
-- Called server-side when a referred user signs up
-- ============================================================
CREATE OR REPLACE FUNCTION public.increment_referral_count(referral_code_param TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.waitlist_users
  SET referral_count = referral_count + 1
  WHERE referral_code = referral_code_param;
END;
$$;

-- ============================================================
-- Function: normalize_email
-- Ensures email is always stored lowercase
-- ============================================================
CREATE OR REPLACE FUNCTION public.normalize_waitlist_user()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.email    := LOWER(TRIM(NEW.email));
  NEW.username := LOWER(TRIM(NEW.username));
  NEW.name     := TRIM(NEW.name);
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_normalize_waitlist_user
  BEFORE INSERT OR UPDATE ON public.waitlist_users
  FOR EACH ROW
  EXECUTE FUNCTION public.normalize_waitlist_user();

-- ============================================================
-- Function: set_waitlist_position
-- Automatically assigns waitlist_position on insert
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_waitlist_position()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  next_pos INTEGER;
BEGIN
  -- Only set if not already provided
  IF NEW.waitlist_position IS NULL THEN
    SELECT COALESCE(MAX(waitlist_position), 0) + 1
    INTO next_pos
    FROM public.waitlist_users;

    NEW.waitlist_position := next_pos;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_set_waitlist_position
  BEFORE INSERT ON public.waitlist_users
  FOR EACH ROW
  EXECUTE FUNCTION public.set_waitlist_position();

-- ============================================================
-- Grants for service role usage
-- ============================================================
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.waitlist_users TO service_role;
GRANT EXECUTE ON FUNCTION public.get_waitlist_count() TO service_role;
GRANT EXECUTE ON FUNCTION public.increment_referral_count(TEXT) TO service_role;

-- ============================================================
-- Optional: analytics view (safe to expose to authenticated users)
-- ============================================================
CREATE OR REPLACE VIEW public.waitlist_stats AS
SELECT
  COUNT(*)                                                    AS total_signups,
  COUNT(*) FILTER (WHERE onboarding_complete = TRUE)          AS completed_onboarding,
  COUNT(*) FILTER (WHERE referred_by IS NOT NULL)             AS referred_signups,
  COUNT(*) FILTER (WHERE status = 'early_access')             AS early_access_granted,
  DATE_TRUNC('day', MIN(created_at))                          AS first_signup_date,
  DATE_TRUNC('day', MAX(created_at))                          AS latest_signup_date
FROM public.waitlist_users;

GRANT SELECT ON public.waitlist_stats TO service_role;
