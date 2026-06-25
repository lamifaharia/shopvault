'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import { staticItems } from '@/lib/items'

function ManageItems() {
  const [userItems, setUserItems] = useState([])
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('shopvault_items') || '[]')
      setUserItems(stored)
    } catch { setUserItems([]) }
  }, [])

  function handleDelete(id) {
    if (!confirm('Delete this product?')) return
    const updated = userItems.filter(i => i.id !== id)
    localStorage.setItem('shopvault_items', JSON.stringify(updated))
    setUserItems(updated)
    setToast('Product deleted')
    setTimeout(() => setToast(null), 2500)
  }

  const allItems = [...staticItems, ...userItems]

  return (
    <div className="page-wrapper" style={{ paddingBottom: 80 }}>
      <div className="container">
        <div style={{ padding: '48px 0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 8 }}>Manage Products</h1>
            <p style={{ color: 'var(--text-muted)' }}>{allItems.length} total products ({userItems.length} added by you)</p>
          </div>
          <Link href="/items/add" className="btn btn-primary">+ Add New Product</Link>
        </div>

        {/* Desktop Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(59,130,246,0.08)', borderBottom: '1px solid var(--border)' }}>
                {['Image', 'Title', 'Category', 'Price', 'Rating', 'Type', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allItems.map((item, i) => {
                const isUser = item.id.toString().startsWith('user_')
                return (
                  <tr key={item.id} style={{ borderBottom: i < allItems.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <img src={item.image} alt={item.title} style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500, maxWidth: 200 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}><span className="badge badge-blue">{item.category}</span></td>
                    <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--blue-glow)' }}>${item.price}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--warning)' }}>{item.rating ? `★ ${item.rating}` : 'N/A'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: isUser ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)', color: isUser ? 'var(--success)' : 'var(--text-dim)' }}>
                        {isUser ? 'Your Item' : 'Static'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Link href={`/items/${item.id}`} className="btn btn-outline btn-sm">View</Link>
                        {isUser && (
                          <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">Delete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

export default function ManagePage() {
  return <ProtectedRoute><ManageItems /></ProtectedRoute>
}