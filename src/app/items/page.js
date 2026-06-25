'use client'
import { useState, useMemo } from 'react'
import { staticItems, categories } from '@/lib/items'
import ItemCard from '@/components/ItemCard'

export default function ItemsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Merge localStorage items with static
  const allItems = useMemo(() => {
    if (typeof window === 'undefined') return staticItems
    try {
      const stored = JSON.parse(localStorage.getItem('shopvault_items') || '[]')
      return [...staticItems, ...stored]
    } catch { return staticItems }
  }, [])

  const filtered = useMemo(() => {
    let items = allItems.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All' || item.category === category
      const matchMin = minPrice === '' || item.price >= Number(minPrice)
      const matchMax = maxPrice === '' || item.price <= Number(maxPrice)
      return matchSearch && matchCategory && matchMin && matchMax
    })
    if (sortBy === 'price-asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') items = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    return items
  }, [allItems, search, category, minPrice, maxPrice, sortBy])

  return (
    <div className="page-wrapper" style={{ paddingBottom: 80 }}>
      <div className="container">
        <div style={{ padding: '48px 0 32px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 8 }}>All Products</h1>
          <p style={{ color: 'var(--text-muted)' }}>Browse our curated collection of {allItems.length} products</p>
        </div>

        {/* Filters */}
        <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Search</label>
              <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Min Price ($)</label>
              <input type="number" placeholder="0" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Max Price ($)</label>
              <input type="number" placeholder="999" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Sort By</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</span>
            <button onClick={() => { setSearch(''); setCategory('All'); setMinPrice(''); setMaxPrice(''); setSortBy('default') }}
              className="btn btn-outline btn-sm">Clear Filters</button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ marginBottom: 8 }}>No products found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  )
}