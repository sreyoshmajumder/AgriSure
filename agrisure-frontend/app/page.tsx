import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(160deg, var(--earth) 0%, var(--earth-mid) 60%, var(--earth-light) 100%)',
        padding: '64px 24px 80px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)', color: 'var(--sun)', fontSize: '12px', fontWeight: 500, padding: '6px 16px', borderRadius: '100px', marginBottom: '24px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          🛡️ Decentralized Crop Insurance
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 8vw, 56px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
          Protect Your<br/><span style={{ color: 'var(--sun)' }}>Harvest</span> Automatically
        </h1>
        <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.6, fontWeight: 300 }}>
          Get paid instantly if drought or flood hits your farm. No paperwork. No waiting.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <Link href="/register" style={{
            background: 'var(--sun)', color: 'var(--earth)', textDecoration: 'none',
            padding: '18px 40px', borderRadius: '100px', fontFamily: 'Syne, sans-serif',
            fontWeight: 700, fontSize: '18px', width: '100%', maxWidth: '320px',
            display: 'block', textAlign: 'center', boxShadow: '0 4px 20px rgba(245,200,66,0.4)',
          }}>
            🌱 Register My Farm
          </Link>
          <Link href="/dashboard" style={{
            background: 'transparent', color: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(255,255,255,0.25)', textDecoration: 'none',
            padding: '16px 40px', borderRadius: '100px', fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400, fontSize: '16px', width: '100%', maxWidth: '320px',
            display: 'block', textAlign: 'center',
          }}>
            View My Dashboard
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', borderTop: '1px solid var(--border)' }}>
        {[
          { num: '₹0', label: 'Claim wait time' },
          { num: '247', label: 'Farms insured' },
          { num: '99%', label: 'Payout accuracy' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', padding: '24px 16px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: 'var(--earth)', display: 'block' }}>{s.num}</span>
            <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '48px 24px' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--earth)', marginBottom: '8px' }}>How it works</div>
        <div style={{ fontSize: '15px', color: 'var(--text-light)', marginBottom: '32px' }}>Four simple steps to protect your crops</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { icon: '🗺️', bg: '#E8F5E0', step: 'Step 1', name: 'Mark Your Land', desc: 'Draw your farm on the map. We\'ll monitor that exact area from space.' },
            { icon: '💰', bg: '#FEF8E0', step: 'Step 2', name: 'Pay Premium',     desc: 'Pay a small premium in crypto. Funds are locked safely in a smart contract.' },
            { icon: '🛰️', bg: '#E0F0FE', step: 'Step 3', name: 'Satellite Watches', desc: 'Our AI checks satellite images and weather every 6 hours.' },
            { icon: '⚡', bg: '#FEF0E0', step: 'Step 4', name: 'Instant Payout',  desc: 'If disaster is detected, money goes straight to your wallet. No claims needed.' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px', boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{s.step}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>{s.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="page-spacer" />
    </div>
  )
}