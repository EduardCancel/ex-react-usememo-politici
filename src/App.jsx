import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [politicians, setPoliticians] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3333/politicians')
        if (!response.ok) {
          throw new Error('Failed to fetch politicians')
        }
        const data = await response.json()
        setPoliticians(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPoliticians()
  }, [])

  if (loading) {
    return <div className="loading">Loading politicians...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <>
      <h1>Politicians List</h1>
      <div className="politicians-grid">
        {politicians.map((politician) => (
          <div key={politician.id} className="politician-card">
            <img
              src={politician.image}
              alt={politician.name}
              className="politician-image"
            />
            <div className="politician-info">
              <h3 className="politician-name">{politician.name}</h3>
              <p className="politician-position">{politician.position}</p>
              <p className="politician-biography">{politician.biography}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App


/* 




*/
