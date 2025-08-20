import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerUser } from '../services/auth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await registerUser({ email, password })
      navigate('/login')
    } catch (err: any) {
      setError(err?.message ?? 'Registration failed')
    }
  }

  return (
    <section className="card">
      <h2>Register</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Create Account</button>
      </form>
      <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
    </section>
  )
}
