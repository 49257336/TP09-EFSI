import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Favorites from './components/Favorites.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import PokemonDetail from './pages/PokemonDetail.jsx'
import './App.css'

const POKEMON_LIMIT = 150
const INITIAL_DISPLAY_LIMIT = 24
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon'
const FAVORITES_STORAGE_KEY = 'pokedex-favorites'

function getStoredFavorites() {
  try {
    const storedFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')
    return Array.isArray(storedFavorites)
      ? [...new Set(storedFavorites.filter(Number.isInteger))]
      : []
  } catch {
    return []
  }
}

function App() {
  const [pokemon, setPokemon] = useState([])
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState(getStoredFavorites)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch (storageError) {
      console.error('No se pudieron guardar los favoritos en localStorage.', storageError)
    }
  }, [favorites])

  useEffect(() => {
    let isActive = true

    async function loadPokemon() {
      try {
        setLoading(true)
        setError('')
        const { data } = await axios.get(`${POKEMON_API}?limit=${POKEMON_LIMIT}`)
        const details = await Promise.all(data.results.map(async (entry) => {
          const { data: detail } = await axios.get(entry.url)
          return {
            id: detail.id,
            name: detail.name,
            image: detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
            types: detail.types.map(({ type }) => type.name),
            weight: detail.weight,
            height: detail.height,
            abilities: detail.abilities.map(({ ability }) => ability.name),
            stats: detail.stats.map(({ base_stat, stat }) => ({ name: stat.name, value: base_stat })),
          }
        }))
        if (isActive) setPokemon(details)
      } catch {
        if (isActive) setError('No hemos podido cargar la Pokédex. Comprueba tu conexión e inténtalo de nuevo.')
      } finally {
        if (isActive) setLoading(false)
      }
    }

    loadPokemon()
    return () => { isActive = false }
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const filteredPokemon = pokemon.filter((item) =>
    item.name.includes(normalizedQuery) || item.types.some((type) => type.includes(normalizedQuery)),
  )
  const displayedPokemon = normalizedQuery
    ? filteredPokemon
    : filteredPokemon.slice(0, INITIAL_DISPLAY_LIMIT)

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id])
  }

  return (
    <div className="app-shell" id="top">
      <Header count={pokemon.length} />
      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <Home
                count={pokemon.length}
                items={displayedPokemon}
                query={query}
                onQueryChange={setQuery}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                loading={loading}
                error={error}
              />
            )}
          />
          <Route
            path="/favoritos"
            element={<Favorites items={pokemon} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetail items={pokemon} loading={loading} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer"><span>POKÉDEX DE KANTO</span><span>HECHO PARA ENTRENADORES CURIOSOS <span className="footer-star">✳</span></span></footer>
    </div>
  )
}

export default App
