'use client'
import Link from 'next/link'
import { staticItems } from '@/lib/items'

const features = [
  { icon: '🔒', title: 'Secure Shopping', desc: 'End-to-end encrypted transactions and Firebase-backed authentication.' },
  { icon: '🚀', title: 'Fast Delivery', desc: 'Same-day dispatch from our certified warehouse partners nationwide.' },
  { icon: '⭐', title: 'Quality Curated', desc: 'Every product passes our 50-point quality inspection before listing.' },
  { icon: '♻️', title: 'Easy Returns', desc: '30-day no-questions-asked return policy on all products.' },
]

const testimonials = [
  { name: 'Ayesha R.', role: 'Interior Designer', text: 'ShopVault has the best curation I have seen online. Every product I have ordered arrived perfectly and matched the description exactly.', rating: 5 },
  { name: 'Tanvir H.', role: 'Tech Blogger', text: 'The electronics section is incredible. Bought three items and all were exactly as described. Fast shipping too!', rating: 5 },
  { name: 'Nadia K.', role: 'Lifestyle Influencer', text: 'I love how clean and intuitive the site is. Found exactly what I was looking for in seconds. Will definitely shop here again.', rating: 5 },
]

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '1,200+', label: 'Products Listed' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '99%', label: 'Satisfaction Rate' },
]

export default function HomePage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{
        minHeight: '90vh', display: 'flex', alignItems: 'center',
        background: 'radial-gradient(ellipse at 60% 50%, rgba(59,130,246,0.12) 0%, transparent 70%), linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <span className="badge badge-blue" style={{ marginBottom: 20, display: 'inline-block' }}>✦ Premium Products, Delivered</span>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 24, lineHeight: 1.1 }}>
              Discover Products<br />
              <span style={{ color: 'var(--blue-glow)' }}>Worth Every Penny</span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 40, maxWidth: 540, lineHeight: 1.8 }}>
              ShopVault curates only the finest products across Electronics, Accessories, and Lifestyle — handpicked for quality, priced for value.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/items" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>Browse Products →</Link>
              <Link href="/register" className="btn btn-outline" style={{ fontSize: 16, padding: '14px 32px' }}>Get Started Free</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 0', background: 'var(--navy-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 36, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'var(--blue-glow)', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 className="section-title">Why Choose ShopVault?</h2>
            <p className="section-sub">Built with trust, transparency, and quality at its core.</p>
          </div>
          <div className="grid-3">
            {features.map(f => (
              <div key={f.title} className="card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '80px 0', background: 'var(--navy-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p style={{ color: 'var(--text-muted)' }}>Our most popular picks this season.</p>
            </div>
            <Link href="/items" className="btn btn-outline btn-sm">View All →</Link>
          </div>
          <div className="grid-3">
            {staticItems.slice(0, 3).map(item => (
              <div key={item.id} className="card">
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 20 }}>
                  <span className="badge badge-blue" style={{ marginBottom: 10, display: 'inline-block' }}>{item.category}</span>
                  <h3 style={{ fontSize: 16, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>{item.shortDescription}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue-glow)' }}>${item.price}</span>
                    <Link href={`/items/${item.id}`} className="btn btn-primary btn-sm">View →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-sub">Real reviews from verified buyers.</p>
          </div>
          <div className="grid-3">
            {testimonials.map(t => (
              <div key={t.name} className="card" style={{ padding: 28 }}>
                <div style={{ color: 'var(--warning)', fontSize: 18, marginBottom: 16 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, rgba(29,78,216,0.3) 0%, rgba(59,130,246,0.1) 100%)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>Ready to Start Shopping?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            Create a free account and unlock the full ShopVault experience — add, manage, and track your favorite products.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>Create Free Account</Link>
            <Link href="/items" className="btn btn-outline" style={{ fontSize: 16, padding: '14px 36px' }}>Explore Products</Link>
          </div>
        </div>
      </section>
    </div>
  )
}