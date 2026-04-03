-- Add SMS consent tracking to leads
alter table public.leads
  add column if not exists sms_consent boolean not null default false;
