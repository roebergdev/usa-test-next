-- Add state_code to leaderboard for IP geolocation display.
-- Nullable: users without a detectable US state (VPN, non-US) get NULL.
ALTER TABLE leaderboard ADD COLUMN state_code text;
