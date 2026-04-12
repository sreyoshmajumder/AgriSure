type Props = {
  value: number   // 0 to 1
}

export default function NdviBar({ value }: Props) {
  const pct = Math.round(value * 100)
  const level = value >= 0.5 ? 'high' : value >= 0.3 ? 'medium' : 'low'
  const label = value >= 0.5 ? 'Good' : value >= 0.3 ? 'Fair' : 'Very Poor'
  const color = level === 'high' ? 'var(--safe)' : level === 'medium' ? 'var(--sun-warm)' : 'var(--alert)'

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-mid)', marginBottom: '8px' }}>
        <span>Crop Health</span>
        <span style={{ color, fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ height: '8px', background: 'var(--sky-deep)', borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: '100px',
          background: color,
          transition: 'width 1s ease',
        }} />
      </div>
    </div>
  )
}