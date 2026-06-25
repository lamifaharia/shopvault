'use client'
import { useParams, useRouter } from 'next/navigation'
import { staticItems } from '@/lib/items'
import Link from 'next/link'
import { useMemo } from 'react'

export default function ItemDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const allItems = useMemo(() => {
    if (typeof window === 'undefined') return staticItems
    try {
      const stored = JSON.parse(localStorage.getItem('shopvault_items') || '[]')
      return [...staticItems, ...stored]
    } catch { return staticItems }
  }, [])

  const item = allItems.find(i => i.id === id)
  const related = allItems.filter(i => i.id !== id && i.category === item?.category).slice(0, 3)

  if (!item) {
    return (
      <div className="page-wrapper" style={{ textAlign: 'center', paddingTop: 160 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
        <h2 style={{ marginBottom: 16 }}>Product Not Found</h2>
        <Link href="/items" className="btn btn-primary">← Back to Products</Link>
      </div>
    )
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: 80 }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ padding: '32px 0 24px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
          <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link> /
          <Link href="/items" style={{ color: 'var(--text-muted)' }}>Products</Link> /
          <span style={{ color: 'var(--blue-glow)' }}>{item.title}</span>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, marginBottom: 64 }}>
          {/* Image */}
          <div>
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '4/3' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Details */}
          <div>
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-block' }}>{item.category}</span>
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 12 }}>{item.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ color: 'var(--warning)', fontSize: 18 }}>{'★'.repeat(Math.floor(item.rating || 4))}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{item.rating} rating</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--blue-glow)', fontFamily: 'Syne, sans-serif', marginBottom: 24 }}>
              ${item.price}
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 32 }}>{item.fullDescription}</p>

            {/* Specs */}
            {item.specs && (
              <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 20, marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', marginBottom: 14 }}>Specifications</h3>
                {Object.entries(item.specs).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>🛒 Add to Cart</button>
              <button onClick={() => router.back()} className="btn btn-outline">← Back</button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>Related Products</h2>
            <div className="grid-3">
              {related.map(r => (
                <div key={r.id} className="card">
                  <div style={{ height: 160, overflow: 'hidden' }}>
                    <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontSize: 15, marginBottom: 8 }}>{r.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--blue-glow)', fontWeight: 700 }}>${r.price}</span>
                      <Link href={`/items/${r.id}`} className="btn btn-outline btn-sm">View</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}