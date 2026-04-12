'use client'
import { useState } from 'react'

export default function Nav() {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)

  function connectWallet() {
    setConnecting(true)
    setTimeout(() => {
      setConnected(true)
      setConnecting(false)
    }, 1500)
  }

  return (
    <nav style={{
      background: 'var(--earth)',
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: 800,
        fontSize: '22px',
        color: 'var(--sun)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        🌾 Agri<span style={{ color: 'white', fontWeight: 400 }}>Sure</span>
      </div>
      <button
        onClick={connectWallet}
        style={{
          background: connected ? 'var(--safe)' : 'var(--sun)',
          color: connected ? 'white' : 'var(--earth)',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '100px',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        {connecting ? '⏳ Connecting...' : connected ? '✓ 0x3f4a...e2b1' : '🔗 Connect Wallet'}
      </button>
    </nav>
  )
}