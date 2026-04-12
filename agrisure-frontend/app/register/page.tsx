'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const crops = [
  { emoji: '🌾', name: 'Rice / Paddy' },
  { emoji: '🌽', name: 'Maize / Corn' },
  { emoji: '🥜', name: 'Groundnut'    },
  { emoji: '🍅', name: 'Vegetables'   },
  { emoji: '🌿', name: 'Cotton'       },
  { emoji: '🌱', name: 'Other Crops'  },
]

export default function Register() {
  const router = useRouter()
  const [selectedCrop, setSelectedCrop] = useState(0)
  const [paying, setPaying] = useState(false)

  function handlePayment() {
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      router.push('/dashboard')
    }, 2500)
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
      <div style={{ background: 'var(--earth)', padding: '32px 24px', color: 'white' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 700 }}>Register Your Farm</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Takes about 3 minutes. Pay once, protected all season.</p>
      </div>

      <div style={{ padding: '32px 24px 0' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Farm Details</div>
        {[
          { label: 'Farm Name',              hint: 'Give your farm a name you\'ll recognise', placeholder: 'e.g. My North Rice Field', type: 'text'   },
          { label: 'Location (Village/Town)', hint: '',                                        placeholder: 'e.g. Kumbakonam, Tamil Nadu',  type: 'text'   },
          { label: 'Farm Size (acres)',       hint: '',                                        placeholder: 'e.g. 3.5',                    type: 'number' },
        ].map((f, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px', display: 'block' }}>{f.label}</label>
            {f.hint && <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '6px' }}>{f.hint}</div>}
            <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', padding: '16px', border: '2px solid var(--border)', borderRadius: '14px', fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--text)', background: 'white' }} />
          </div>
        ))}
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>What do you grow?</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
          {crops.map((c, i) => (
            <button key={i} onClick={() => setSelectedCrop(i)} style={{
              padding: '16px 12px', border: `2px solid ${selectedCrop === i ? 'var(--earth)' : 'var(--border)'}`,
              borderRadius: '14px', background: selectedCrop === i ? '#E8F5E0' : 'white',
              cursor: 'pointer', textAlign: 'center', fontFamily: 'DM Sans, sans-serif',
            }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '6px' }}>{c.emoji}</span>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{c.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Premium Card */}
      <div style={{ margin: '24px', background: 'linear-gradient(135deg, var(--earth), var(--earth-mid))', borderRadius: '20px', padding: '24px', color: 'white' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Your Insurance Premium</h3>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '36px', fontWeight: 800, color: 'var(--sun)' }}>0.042 ETH</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>≈ ₹7,200 · covers full season</div>
        {[
          { label: 'Coverage amount',  value: '0.85 ETH (≈ ₹1,45,000)'          },
          { label: 'Payout trigger',   value: 'NDVI < 0.25 or Rain < 5mm/week'  },
          { label: 'Coverage period',  value: 'Kharif season 2025'               },
          { label: 'Payout time',      value: 'Instant (automated)'              },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{r.label}</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{r.value}</span>
          </div>
        ))}
      </div>

      <button onClick={handlePayment} style={{
        display: 'block', width: 'calc(100% - 48px)', margin: '0 24px',
        background: 'var(--sun)', color: 'var(--earth)', border: 'none',
        padding: '20px', borderRadius: '16px', fontFamily: 'Syne, sans-serif',
        fontWeight: 800, fontSize: '18px', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(245,200,66,0.4)',
      }}>
        {paying ? '⏳ Confirming transaction...' : '🔒 Pay Premium & Activate Insurance'}
      </button>
    </div>
  )
}