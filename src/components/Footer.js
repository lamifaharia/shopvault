"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--navy-light)',
      borderTop: '1px solid var(--border)',
      marginTop: 80,
      padding: '60px 0 32px',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>⚡</span> ShopVault
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.8 }}>
              Your destination for premium products, curated for quality and value.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 16 }}>Navigation</h4>
            {[{ href: '/', label: 'Home' }, { href: '/items', label: 'Products' }, { href: '/about', label: 'About Us' }].map(l => (
              <Link key={l.href} href={l.href} className="block text-[var(--text-muted)] text-[14px] mb-[10px] transition-colors duration-200 hover:text-[var(--blue-glow)]">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Account */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 16 }}>Account</h4>
            {[{ href: '/login', label: 'Sign In' }, { href: '/register', label: 'Register' }, { href: '/items/add', label: 'Add Product' }, { href: '/items/manage', label: 'Manage Products' }].map(l => (
              <Link key={l.href} href={l.href} className="block text-[var(--text-muted)] text-[14px] mb-[10px] transition-colors duration-200 hover:text-[var(--blue-glow)]">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 16 }}>Connect</h4>
            <div style={{ display: 'flex', gap: 12 }}>
              {['𝕏', 'in', 'fb', 'yt'].map(icon => (
                <a key={icon} href="#" className="w-[40px] h-[40px] rounded-lg bg-[var(--navy-card)] border border-[var(--border)] flex items-center justify-center text-[13px] font-bold text-[var(--text-muted)] transition-all duration-200 hover:border-[var(--blue)] hover:text-[var(--blue-glow)]">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>© 2025 ShopVault. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Cookies'].map(t => (
              <a key={t} href="#" className="text-[var(--text-dim)] text-[13px] transition-colors duration-200 hover:text-[var(--blue-glow)]">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}