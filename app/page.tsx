import Sidebar from './components/Sidebar'

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ padding: '2rem', flex: 1 }}>
        <h1>Welcome to Mom Hub</h1>
        <p>Your central hub for all things mom-related.</p>
        <section style={{ marginTop: '2rem' }}>
          <h2>Getting Started</h2>
          <p>This is your Mom Hub - a central place for resources, community, and tips.</p>
        </section>
      </main>
    </div>
  )
}
