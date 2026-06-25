'use client'
import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

function AddItemForm() {
  const [form, setForm] = useState({
    title: '', shortDescription: '', fullDescription: '',
    price: '', category: 'Electronics', image: '', priority: 'Medium',
  })
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  const categories = ['Electronics', 'Accessories', 'Lifestyle', 'Other']
  const priorities = ['Low', 'Medium', 'High']

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.shortDescription.trim()) e.shortDescription = 'Short description is required'
    if (!form.fullDescription.trim()) e.fullDescription = 'Full description is required'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Enter a valid price'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('shopvault_items') || '[]')
        const newItem = {
          ...form,
          id: `user_${Date.now()}`,
          price: Number(form.price),
          rating: 4.0,
          image: form.image || `https://placehold.co/400x300/1a2236/3b82f6?text=${encodeURIComponent(form.title.slice(0, 10))}`,
          specs: { Category: form.category, Priority: form.priority },
          createdAt: new Date().toISOString(),
        }
        localStorage.setItem('shopvault_items', JSON.stringify([...existing, newItem]))
        setToast('Product added successfully!')
        setForm({ title: '', shortDescription: '', fullDescription: '', price: '', category: 'Electronics', image: '', priority: 'Medium' })
        setLoading(false)
        setTimeout(() => setToast(null), 3000)
      } catch (err) {
        setToast('Error adding product')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <div style={{ padding: '48px 0 32px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 8 }}>Add New Product</h1>
          <p style={{ color: 'var(--text-muted)' }}>Fill in the details to list a new product</p>
        </div>

        <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 40 }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Title *</label>
              <input name="title" placeholder="e.g., Wireless Headphones Pro" value={form.title} onChange={handleChange} />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>
            <div className="form-group">
              <label>Short Description *</label>
              <input name="shortDescription" placeholder="One-line summary of the product" value={form.shortDescription} onChange={handleChange} />
              {errors.shortDescription && <p className="form-error">{errors.shortDescription}</p>}
            </div>
            <div className="form-group">
              <label>Full Description *</label>
              <textarea name="fullDescription" rows={5} placeholder="Detailed description of the product..." value={form.fullDescription} onChange={handleChange} style={{ resize: 'vertical' }} />
              {errors.fullDescription && <p className="form-error">{errors.fullDescription}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label>Price (USD) *</label>
                <input name="price" type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={handleChange} />
                {errors.price && <p className="form-error">{errors.price}</p>}
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label>Priority</label>
                <select name="priority" value={form.priority} onChange={handleChange}>
                  {priorities.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Image URL (optional)</label>
                <input name="image" placeholder="https://..." value={form.image} onChange={handleChange} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, marginTop: 8 }} disabled={loading}>
              {loading ? '⏳ Adding Product...' : '✅ Submit Product'}
            </button>
          </form>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

export default function AddItemPage() {
  return <ProtectedRoute><AddItemForm /></ProtectedRoute>
}