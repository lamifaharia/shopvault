'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dropRef = useRef(null)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/items', label: 'Products' },
    { href: '/about', label: 'About' },
  ]

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleLogout() {
    await logout()
    router.push('/')
    setDropOpen(false)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22 }}>
          <div style={{ width: 32, height: 32, background: 'var(--blue)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
          ShopVault
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: pathname === l.href ? 'var(--blue-glow)' : 'var(--text-muted)',
              background: pathname === l.href ? 'rgba(59,130,246,0.1)' : 'transparent',
              transition: 'all 0.2s',
            }}>{l.label}</Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button onClick={() => setDropOpen(!dropOpen)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                background: 'var(--navy-card)', border: '1px solid var(--border)',
                borderRadius: 8, color: 'var(--text)', cursor: 'pointer',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {user.email[0].toUpperCase()}
                </div>
                <span style={{ fontSize: 13, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</span>
                <span style={{ fontSize: 10 }}>▼</span>
              </button>
              {dropOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '100%', marginTop: 8,
                  background: 'var(--navy-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', minWidth: 200, boxShadow: 'var(--shadow)',
                  overflow: 'hidden', zIndex: 999,
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Signed in as</div>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                  </div>
                  {[{ href: '/items/add', label: '➕ Add Product' }, { href: '/items/manage', label: '⚙️ Manage Products' }].map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setDropOpen(false)} style={{
                      display: 'block', padding: '12px 16px', fontSize: 13, fontWeight: 500,
                      borderBottom: '1px solid var(--border)',
                      transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.target.style.background = 'rgba(59,130,246,0.08)'}
                      onMouseLeave={e => e.target.style.background = 'transparent'}
                    >{item.label}</Link>
                  ))}
                  <button onClick={handleLogout} style={{
                    display: 'block', width: '100%', padding: '12px 16px', fontSize: 13,
                    fontWeight: 600, color: 'var(--danger)', background: 'transparent',
                    border: 'none', textAlign: 'left', cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >🚪 Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-sm">Log In</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger" style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: 22, display: 'none', padding: 4 }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--navy-light)', padding: '16px 24px' }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 15 }}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/items/add" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 15 }}>Add Product</Link>
              <Link href="/items/manage" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 15 }}>Manage Products</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false) }} style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: 15, padding: '12px 0', width: '100%', textAlign: 'left' }}>Sign Out</button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <Link href="/login" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>Log In</Link>
              <Link href="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}