import Link from 'next/link'

export default function MapPage() {
  return (
    <div style={{ height: 'calc(100vh - 64px)', background: '#e8f0e8', position: 'relative', overflow: 'hidden' }}>
      {/* Grid background */}
      <div style={{
        width: '100%', height: '100%',
        backgroundImage: 'linear-gradient(rgba(45,74,30,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,74,30,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '16px',
      }}>
        {/* Farm outlines */}
        <div style={{ position: 'absolute', width: '140px', height: '100px', top: '120px', left: '60px', border: '3px solid var(--earth-light)', background: 'rgba(90,143,60,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-3deg)' }}>
          <div style={{ background: 'var(--earth)', color: 'white', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px' }}>North Plot ⚠️</div>
        </div>
        <div style={{ position: 'absolute', width: '120px', height: '90px', top: '250px', left: '180px', border: '3px solid var(--safe)', background: 'rgba(61,155,90,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--safe)', color: 'white', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px' }}>South Plot ✓</div>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-mid)' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🗺️</div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--earth)' }}>Interactive Map</div>
          <div style={{ fontSize: '13px', marginTop: '4px' }}>Connect Mapbox API to enable<br/>live satellite + drawing</div>
        </div>
      </div>

      {/* Bottom controls */}
      <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 8px 48px rgba(45,74,30,0.16)' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>🌾 North Plot — Live Data</div>
          {[
            { label: 'NDVI (Crop health)', value: '0.18 — Very Poor', danger: true },
            { label: 'Rainfall (7 days)',  value: '2.1 mm',           danger: false },
            { label: 'Temperature',        value: '38°C',             danger: false },
            { label: 'Insurance status',   value: 'Active ✓',         danger: false },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < 3 ? '8px' : 0 }}>
              <span style={{ fontSize: '13px', color: 'var(--text-light)' }}>{m.label}</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: m.danger ? 'var(--alert)' : 'var(--text)' }}>{m.value}</span>
            </div>
          ))}
        </div>
        <Link href="/register" style={{
          background: 'var(--earth)', color: 'white', textDecoration: 'none',
          padding: '16px', borderRadius: '16px', fontFamily: 'Syne, sans-serif',
          fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '8px', boxShadow: '0 8px 48px rgba(45,74,30,0.16)',
        }}>
          ✏️ Draw New Farm Parcel
        </Link>
      </div>
    </div>
  )
}