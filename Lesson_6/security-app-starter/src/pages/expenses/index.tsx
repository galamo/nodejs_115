import { getExpensesByDates } from '../../services/expenses.api'
import { useEffect, useState } from 'react'

function formatDateInput(d: Date) {
    return d.toISOString().slice(0, 10)
}

export default function Expenses() {
    const [from, setFrom] = useState(formatDateInput(new Date(new Date().setMonth(new Date().getMonth() - 2))))
    const [to, setTo] = useState(formatDateInput(new Date()))
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    async function load() {
        setLoading(true); setError(null)
        try {
            const res = await getExpensesByDates({ from: "2025-05-25 09:08:04", to: "2025-08-22 12:39:23" })
            console.log(res)
            setItems(res)
        } catch (e: any) {
            setError(e?.message ?? 'Failed to load')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    return (
        <section className="card">
            <div className="card-header">
                <h2>Expenses</h2>
                {/* <div className="filters">
          <label>From <input type="date" value={from} onChange={e => setFrom(e.target.value)} /></label>
          <label>To <input type="date" value={to} onChange={e => setTo(e.target.value)} /></label>
          <button className="btn" onClick={load} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button>
        </div> */}
            </div>
            {/* {error && <div className="error">{error}</div>} */}
            {/* <div className="grid">
        {items.map((it, idx) => (
          <div key={idx} className="tile">
            <div className="tile-title">Session #{it.session ?? it.id ?? idx+1}</div>
            <div className="tile-body">
              <div><strong>Date:</strong> {it.date ?? it.createdAt ?? '-'}</div>
              <div><strong>Country:</strong> {it.country ?? '-'}</div>
              <div><strong>Amount:</strong> {it.amount ?? '-'}</div>
            </div>
          </div>
        ))}
        {!loading && items.length === 0 && <p className="muted">No results for the selected range.</p>}
      </div> */}
        </section>
    )
}
