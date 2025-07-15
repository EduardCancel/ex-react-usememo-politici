import { useState, useEffect, useMemo } from 'react'
import './App.css'

function App() {
  const [politicians, setPoliticians] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  // Array derivato filtrato - si aggiorna solo quando cambia politicians o searchTerm
  const filteredPoliticians = useMemo(() => {
    if (!searchTerm) return politicians

    return politicians.filter(politician =>
      politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      politician.biography.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [politicians, searchTerm])

  if (loading) {
    return <div className="loading">Loading politicians...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <>
      <h1>Politicians List</h1>

      {/* Campo di ricerca */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search politicians by name or biography..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Risultati filtrati */}
      <div className="politicians-grid">
        {filteredPoliticians.length === 0 ? (
          <div className="no-results">
            {searchTerm ? `No politicians found matching "${searchTerm}"` : 'No politicians available'}
          </div>
        ) : (
          filteredPoliticians.map((politician) => (
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
          ))
        )}
      </div>
    </>
  )
}

export default App


/* 

Milestone 1: Recuperare e visualizzare i dati ✅
Effettua una chiamata API a http://localhost:3333/politicians
Salva la risposta in uno stato React (useState).
Mostra i politici in una lista di card.

Milestone 2: Implementare la ricerca ottimizzata ✅
Aggiungi un campo di ricerca per filtrare i risultati.
Utilizzare useMemo per creare un array derivato filtrato che si aggiorna 
solo quando cambia la lista di politici o il valore della ricerca.
❌ Non usare useEffect per aggiornare l'array filtrato.

Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili.

*/
