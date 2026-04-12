export default function Claim() {
  const timeline = [
    { label: 'Satellite data collected',       sub: 'NDVI = 0.18 detected · 6 hrs ago',              status: 'done'    },
    { label: 'AI model confirmed drought',      sub: 'Disaster score 0.91 · threshold 0.75',          status: 'done'    },
    { label: 'Oracle submitted to blockchain',  sub: 'Transaction 0x3f4a...e2b1 confirmed',           status: 'done'    },
    { label: 'Smart contract releasing funds',  sub: 'Processing · usually under 2 minutes',          status: 'active'  },
    { label: 'ETH arrives in your wallet',      sub: 'Pending',                                       status: 'pending' },
  ]

  return (
    <div style={{ paddingBottom: '100px' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--alert), #C04A1B)', padding: '32px 24px', color: 'white' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 700 }}>⚡ Payout in Progress</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>North Plot · Drought detected April 2025</p>
      </div>

      <div style={{ margin: '20px 24px', background: 'linear-gradient(135deg, var(--safe), #2D7A3A)', borderRadius: '20px', padding: '24px', color: 'white', textAlign: 'center' }}>
        <h3 style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>You are receiving</h3>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: 800 }}>0.85 ETH</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>≈ ₹1,45,000 · being sent to your wallet</div>
      </div>

      <div style={{ margin: '0 24px 20px', background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow)' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Payout Timeline</div>
        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          <div style={{ position: 'absolute', left: '9px', top: '8px', bottom: '8px', width: '2px', background: 'var(--border)' }} />
          {timeline.map((t, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < timeline.length - 1 ? '24px' : 0 }}>
              <div style={{
                position: 'absolute', left: '-32px', top: '2px',
                width: '20px', height: '20px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 700,
                background: t.status === 'done' ? 'var(--safe)' : t.status === 'active' ? 'var(--sun)' : 'var(--border)',
                color: t.status === 'done' ? 'white' : t.status === 'active' ? 'var(--earth)' : 'var(--text-light)',
              }}>
                {t.status === 'done' ? '✓' : t.status === 'active' ? '⟳' : '○'}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>{t.label}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-light)', marginTop: '2px' }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '0 24px', background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '20px', boxShadow: 'var(--shadow)' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>No action needed from you</div>
        <div style={{ fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.6 }}>
          The smart contract has automatically verified the drought and is releasing your payout. This happens without any paperwork or manual review. You will receive a notification when ETH arrives.
        </div>
      </div>
    </div>
  )
}