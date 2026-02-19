export default function Sidebar() {
  return (
    <aside style={{
      width: '250px',
      padding: '1rem',
      backgroundColor: '#f5f5f5',
      borderRight: '1px solid #ddd',
      minHeight: '100vh'
    }}>
      <h2 style={{ marginTop: 0 }}>Mom Hub</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#333' }}>Home</a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#333' }}>Resources</a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#333' }}>Community</a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#333' }}>Tips</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
