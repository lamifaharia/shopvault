import Link from 'next/link'

export default function ItemCard({ item }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <span className="badge badge-blue" style={{ position: 'absolute', top: 12, left: 12 }}>{item.category}</span>
      </div>
      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{item.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, flex: 1, lineHeight: 1.7 }}>{item.shortDescription}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue-glow)' }}>${item.price}</div>
            <div style={{ fontSize: 12, color: 'var(--warning)' }}>{'★'.repeat(Math.floor(item.rating))} <span style={{ color: 'var(--text-dim)' }}>{item.rating}</span></div>
          </div>
          <Link href={`/items/${item.id}`} className="btn btn-primary btn-sm">View Details</Link>
        </div>
      </div>
    </div>
  )
}