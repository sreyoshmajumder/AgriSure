'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import FarmCard from '@/components/FarmCard'

const mockFarms = [
  {
    id: '1',
    name: 'North Plot',
    location: 'Thanjavur, Tamil Nadu',
    acres: 3.2,
    ndvi: 0.18,
    rainfall: 2.1,
    temperature: 38,
  },
  {
    id: '2',
    name: 'South Plot',
    location: 'Thanjavur, Tamil Nadu',
    acres: 2.8,
    ndvi: 0.64,
    rainfall: 18.4,
    temperature: 31,
  },
]

export default function Dashboard() {
  const [farms, setFarms] = useState(mockFarms)

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'var(--earth)',
        padding: '32px 24px 24px',
        color: 'white',
      }}>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '4px',
        }}>
          My Farms
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
          Last updated 6 minutes ago · {farms.length} farms monitored
        </p>
      </div>

      {/* Alert Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--alert), #C04A1B)',
        margin: '20px 24px',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 4px 20px rgba(224,90,43,0.3)',
      }}>
        <div style={{ fontSize: '32px', flexShrink: 0 }}>⚠️</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '16px',
            fontWeight: 700,
            color: 'white',
          }}>
            Drought Alert — North Plot
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>
            NDVI dropped below threshold. Payout processing.
          </div>
        </div>
        <Link href="/claim" style={{
          background: 'white',
          color: 'var(--alert)',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '100px',
          fontWeight: 600,
          fontSize: '13px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          View →
        </Link>
      </div>

      {/* Farm Cards */}
      <div style={{
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {farms.map(farm => (
          <FarmCard key={farm.id} farm={farm} />
        ))}

        <Link href="/register" style={{
          display: 'block',
          background: 'var(--sun)',
          color: 'var(--earth)',
          textDecoration: 'none',
          padding: '18px',
          borderRadius: '100px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          textAlign: 'center',
          marginTop: '8px',
          boxShadow: '0 4px 20px rgba(245,200,66,0.4)',
        }}>
          + Register New Farm
        </Link>
      </div>

      <div className="page-spacer" />
    </div>
  )
}