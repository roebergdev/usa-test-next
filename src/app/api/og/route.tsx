import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const score = parseInt(searchParams.get('score') ?? '0');
  const total = parseInt(searchParams.get('total') ?? '10');
  const streak = parseInt(searchParams.get('streak') ?? '0');
  const name = searchParams.get('name') ?? '';

  // Tier label based on score
  function getTier(s: number, t: number) {
    const pct = s / t;
    if (pct === 1) return { label: 'PERFECT SCORE', color: '#D97706' };
    if (pct >= 0.8) return { label: 'TOP 25%', color: '#1B3A6B' };
    if (pct >= 0.6) return { label: 'TOP 50%', color: '#059669' };
    return { label: 'COMPLETED', color: '#6B7280' };
  }

  const tier = getTier(score, total);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0D1B3E',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Red top bar */}
        <div style={{ width: '100%', height: '14px', background: '#C8102E', flexShrink: 0 }} />

        {/* Subtle dot grid decoration */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${6 + (i % 3) * 4}px`,
              height: `${6 + (i % 3) * 4}px`,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              top: `${10 + (i * 47) % 580}px`,
              left: `${(i * 97) % 1180}px`,
            }}
          />
        ))}

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0px',
            padding: '0 80px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div style={{ width: '60px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
            <div style={{ display: 'flex', gap: '0px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }}>USA&nbsp;</span>
              <span style={{ color: '#C8102E', fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }}>TEST</span>
            </div>
            <div style={{ width: '60px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
          </div>

          {/* Score */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', lineHeight: 1 }}>
            <span style={{ color: '#FFFFFF', fontSize: '160px', fontWeight: 900, letterSpacing: '-4px' }}>
              {score}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '80px', fontWeight: 900 }}>
              /{total}
            </span>
          </div>

          {/* Tier + streak row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
            <div
              style={{
                background: tier.color,
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: 900,
                letterSpacing: '2px',
                padding: '8px 20px',
                borderRadius: '999px',
              }}
            >
              {tier.label}
            </div>
            {streak > 1 && (
              <div
                style={{
                  background: 'rgba(249,115,22,0.2)',
                  border: '1px solid rgba(249,115,22,0.5)',
                  color: '#FB923C',
                  fontSize: '18px',
                  fontWeight: 900,
                  padding: '8px 20px',
                  borderRadius: '999px',
                }}
              >
                {streak}-DAY STREAK
              </div>
            )}
          </div>

          {/* Name (if provided) */}
          {name && (
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '22px', fontWeight: 700, marginTop: '20px' }}>
              {name}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              width: '200px',
              height: '2px',
              background: 'rgba(255,255,255,0.1)',
              marginTop: '32px',
              marginBottom: '24px',
            }}
          />

          {/* CTA */}
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
            Think you can beat this?
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '36px', fontWeight: 900, letterSpacing: '-0.5px' }}>
            usatest.co
          </div>
        </div>

        {/* Red bottom bar */}
        <div style={{ width: '100%', height: '14px', background: '#C8102E', flexShrink: 0 }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
