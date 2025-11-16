
import React, { Suspense } from 'react'
const RemoteComponent = React.lazy(() => import('remote/RemoteComponent'))

export default function App() {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback={<div>Loading Remote...</div>}>
        <RemoteComponent />
      </Suspense>
    </div>
  )
}
