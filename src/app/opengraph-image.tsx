import { ImageResponse } from 'next/og';

export const alt = 'USA Test daily test preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F8FAFF 0%, #EEF4FF 55%, #FFF5F5 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '360px',
            height: '360px',
            borderRadius: '999px',
            background: 'rgba(204, 0, 0, 0.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-140px',
            left: '-60px',
            width: '420px',
            height: '420px',
            borderRadius: '999px',
            background: 'rgba(0, 51, 102, 0.14)',
          }}
        />
        <div
          style={{
            width: '960px',
            height: '470px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            border: '3px solid rgba(0, 51, 102, 0.10)',
            borderRadius: '36px',
            padding: '48px 56px',
            boxShadow: '0 24px 60px rgba(0, 51, 102, 0.10)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src="https://usatest.co/logo.png"
                alt="USA Test logo"
                width="64"
                height="64"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  boxShadow: '0 12px 24px rgba(0, 51, 102, 0.16)',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span
                  style={{
                    color: '#003366',
                    fontSize: '54px',
                    fontWeight: 900,
                    letterSpacing: '-2px',
                  }}
                >
                  USA
                </span>
                <span
                  style={{
                    color: '#CC0000',
                    fontSize: '54px',
                    fontWeight: 900,
                    letterSpacing: '-2px',
                    marginLeft: '12px',
                  }}
                >
                  TEST
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  color: '#111827',
                  fontSize: '76px',
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: '-4px',
                  maxWidth: '820px',
                }}
              >
                How Smart Are You?
              </div>
              <div
                style={{
                  color: '#4B5563',
                  fontSize: '28px',
                  lineHeight: 1.3,
                  fontWeight: 700,
                  maxWidth: '760px',
                }}
              >
                Five new questions every day across civics, geography, culture, and U.S. history.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {['Daily Test', 'Practice Mode', 'Leaderboard'].map((label, index) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  fontSize: '22px',
                  fontWeight: 900,
                  color: index === 0 ? '#FFFFFF' : '#003366',
                  background: index === 0 ? '#CC0000' : 'rgba(0, 51, 102, 0.08)',
                  border: index === 0 ? 'none' : '2px solid rgba(0, 51, 102, 0.12)',
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
