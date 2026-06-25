import Link from 'next/link'

const team = [
  { name: 'Alex Johnson', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Sara Malik', role: 'Head of Products', emoji: '👩‍💻' },
  { name: 'Omar Rahman', role: 'Lead Engineer', emoji: '👨‍🔧' },
]

const values = [
  { icon: '🎯', title: 'Quality First', desc: 'Every item in ShopVault passes our strict quality review.' },
  { icon: '💬', title: 'Transparency', desc: 'Honest pricing, real reviews, no hidden fees.' },
  { icon: '🌍', title: 'Community', desc: 'Built for everyday shoppers who value their time and money.' },
  { icon: '🔐', title: 'Security', desc: 'Your data is protected with Firebase-grade authentication.' },
]

export default function AboutPage() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: 80 }}>
      <div className="container">
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '64px 0 80px', maxWidth: 680, margin: '0 auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: 20, display: 'inline-block' }}>Our Story</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 20 }}>Built for Shoppers<br /><span style={{ color: 'var(--blue-glow)' }}>Who Demand More</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.9 }}>
            ShopVault was created to solve a simple problem: finding genuinely good products without wading through thousands of mediocre listings. We curate, verify, and present only what we'd buy ourselves.
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, marginBottom: 32, textAlign: 'center' }}>What We Stand For</h2>
          <div className="grid-3">
            {values.map(v => (
              <div key={v.title} className="card" style={{ padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, marginBottom: 32, textAlign: 'center' }}>The Team</h2>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {team.map(t => (
              <div key={t.name} className="card" style={{ padding: 36, textAlign: 'center', minWidth: 200, flex: '1 1 200px', maxWidth: 260 }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>{t.emoji}</div>
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{t.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '56px 32px' }}>
          <h2 style={{ fontSize: 28, marginBottom: 12 }}>Ready to Explore?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Browse our curated collection or create an account to start managing products.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/items" className="btn btn-primary">Browse Products</Link>
            <Link href="/register" className="btn btn-outline">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}