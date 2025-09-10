import api from './api'

interface DateQuery { from: string; to: string }

// Example service matching your earlier pattern:
// GET /dates?from=YYYY-MM-DD&to=YYYY-MM-DD  with Authorization header
export async function fetchDates({ from, to }: DateQuery) {
  const { data } = await api.get('/dates', { params: { from, to } })
  // Expecting an array; if your API returns {items: []}, adjust here
  return Array.isArray(data) ? data : (data?.items ?? [])
}
