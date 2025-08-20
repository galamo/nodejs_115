import { isAuthenticated } from '../services/auth'
import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <>{children}</>
}
