'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/',          icon: '🏠', label: 'Home'     },
  { href: '/dashboard', icon: '📊', label: 'My Farms' },
  { href: '/map',       icon: '🗺️', label: 'Map'      },
  { href: '/register',  icon: '➕', label: 'Register' },
  { href: '/claim',     icon: '⚡', label: 'Payouts'  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      background: 'white',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      height: '72px',
      zIndex: 99,
      boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
    }}>
      {tabs.map(tab => {
        const active = pathname === tab.href
        return (
          <Link key={tab.href} href={tab.href} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            textDecoration: 'none',
          }}>
            <div style={{
              fontSize: '22px',
              transform: active ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.2s',
            }}>
              {tab.icon}
            </div>
            <div style={{
              fontSize: '11px',
              color: active ? 'var(--earth)' : 'var(--text-light)',
              fontWeight: active ? 700 : 500,
            }}>
              {tab.label}
            </div>
            {active && (
              <div style={{
                width: '4px', height: '4px',
                borderRadius: '50%',
                background: 'var(--earth)',
                marginTop: '-2px',
              }} />
            )}
          </Link>
        )
      })}
    </div>
  )
}