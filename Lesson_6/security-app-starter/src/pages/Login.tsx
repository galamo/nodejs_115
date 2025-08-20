import { FormEvent, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { login } from '../services/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation() as any
  const from = location.state?.from?.pathname || '/data'

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(err?.message ?? 'Login failed')
    }
  }

  return (
    <section className="card">
      <h2>Login</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Sign In</button>
      </form>
      <p className="muted">No account? <Link to="/register">Register</Link></p>
    </section>
  )
}
