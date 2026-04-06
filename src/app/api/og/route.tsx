import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const score = parseInt(searchParams.get('score') ?? '0');
  const total = parseInt(searchParams.get('total') ?? '10');
  const streak = parseInt(searchParams.get('streak') ?? '0');
  const name = searchParams.get('name') ?? '';

  function getTier(s: number, t: number) {
    const pct = s / t;
    if (pct === 1) return { label: 'Perfect Score!', bg: '#FEF3C7', color: '#D97706', border: '#FCD34D' };
    if (pct >= 0.8) return { label: 'Top 25%', bg: '#DBEAFE', color: '#1D4ED8', border: '#93C5FD' };
    if (pct >= 0.6) return { label: 'Above Average', bg: '#DCFCE7', color: '#16A34A', border: '#86EFAC' };
    return { label: 'Completed', bg: '#F3F4F6', color: '#6B7280', border: '#D1D5DB' };
  }

  const tier = getTier(score, total);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#F8FAFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '340px', height: '340px', background: '#FECACA', borderRadius: '50%', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', background: '#BFDBFE', borderRadius: '50%', opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: '60%', right: '10%', width: '160px', height: '160px', background: '#FDE68A', borderRadius: '50%', opacity: 0.35 }} />

        {/* Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '32px',
            border: '3px solid #E5E7EB',
            padding: '48px 64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 8px 0 #D1D5DB',
            width: '860px',
            position: 'relative',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
              <span style={{ color: '#1B3A6B', fontSize: '32px', fontWeight: 900, letterSpacing: '-1px' }}>USA&nbsp;</span>
              <span style={{ color: '#C8102E', fontSize: '32px', fontWeight: 900, letterSpacing: '-1px' }}>TEST</span>
            </div>
          </div>

          {/* Score */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', lineHeight: 1 }}>
            <span style={{ color: '#111827', fontSize: '140px', fontWeight: 900, letterSpacing: '-6px' }}>
              {score}
            </span>
            <span style={{ color: '#D1D5DB', fontSize: '72px', fontWeight: 900, letterSpacing: '-2px' }}>
              /{total}
            </span>
          </div>

          {/* Tier badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: tier.bg,
              border: `2px solid ${tier.border}`,
              color: tier.color,
              fontSize: '20px',
              fontWeight: 900,
              letterSpacing: '1px',
              padding: '8px 24px',
              borderRadius: '999px',
            }}>
              {tier.label}
            </div>
            {streak > 1 && (
              <div style={{
                background: '#FFF7ED',
                border: '2px solid #FED7AA',
                color: '#EA580C',
                fontSize: '20px',
                fontWeight: 900,
                padding: '8px 24px',
                borderRadius: '999px',
              }}>
                {streak}-day streak
              </div>
            )}
          </div>

          {/* Name */}
          {name && (
            <div style={{ color: '#9CA3AF', fontSize: '20px', fontWeight: 700 }}>
              {name}
            </div>
          )}
        </div>

        {/* CTA below card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '28px' }}>
          <div style={{ color: '#374151', fontSize: '26px', fontWeight: 900 }}>
            Think you can beat this?
          </div>
          <div style={{ color: '#C8102E', fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px' }}>
            usatest.co — free daily test
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
