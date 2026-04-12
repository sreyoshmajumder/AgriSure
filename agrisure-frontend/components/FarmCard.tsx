import NdviBar from './NdviBar'
import Link from 'next/link'

type Farm = {
  id: string
  name: string
  location: string
  acres: number
  ndvi: number
  rainfall: number
  temperature: number
}

export default function FarmCard({ farm }: { farm: Farm }) {
  const status = farm.ndvi >= 0.5 ? 'healthy' : farm.ndvi >= 0.3 ? 'warning' : 'danger'
  const statusLabel = status === 'healthy' ? '✓ Healthy' : status === 'warning' ? '⚠ Fair' : '⚠ Alert'
  const statusColors: Record<string, { bg: string; color: string }> = {
    healthy: { bg: '#E8F5E0', color: '#2D7A3A' },
    warning: { bg: '#FEF3E0', color: '#B07A10' },
    danger:  { bg: '#FEE8E0', color: '#C03A1A' },
  }
  const sc = statusColors[status]

  return (
    <Link href="/map" style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        cursor: 'pointer',
      }}>
        <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700 }}>{farm.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-light)', marginTop: '2px' }}>
              📍 {farm.location} · {farm.acres} acres
            </div>
          </div>
          <div style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: sc.bg, color: sc.color }}>
            {statusLabel}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', borderTop: '1px solid var(--border)' }}>
          {[
            { val: farm.ndvi.toFixed(2), key: 'NDVI Score', warn: farm.ndvi < 0.25 },
            { val: `${farm.rainfall}mm`, key: '7-day Rain', warn: farm.rainfall < 5 },
            { val: `${farm.temperature}°C`, key: 'Temperature', warn: false },
          ].map((m, i) => (
            <div key={i} style={{ background: '#FAFEF8', padding: '14px 12px', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700,
                color: m.warn ? 'var(--alert)' : 'var(--earth)',
              }}>{m.val}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '3px' }}>{m.key}</div>
            </div>
          ))}
        </div>

        <NdviBar value={farm.ndvi} />
      </div>
    </Link>
  )
}