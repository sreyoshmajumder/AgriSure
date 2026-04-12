// lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000'

export async function registerFarm(data: {
  name: string; wallet_address: string; lat: number; lon: number
}) {
  const res = await fetch(`${BASE}/farms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Registration failed')
  return res.json()
}

export async function getFarmHealth(farmId: string) {
  const res = await fetch(`${BASE}/farm/${farmId}/health`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Health fetch failed')
  return res.json()
}

export async function getAlerts() {
  const res = await fetch(`${BASE}/alerts`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Alerts fetch failed')
  return res.json()
}