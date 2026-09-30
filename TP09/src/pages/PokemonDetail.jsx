import { Link, useParams } from 'react-router-dom'

function PokemonDetail({ items, loading }) {
  const { pokemonId } = useParams()
  const pokemon = items.find((item) => String(item.id) === pokemonId)

  if (loading) {
    return <p className="feedback" role="status"><span className="loading-ball" /> Cargando información...</p>
  }

  if (!pokemon) {
    return (
      <section className="detail-unavailable">
        <p className="eyebrow">FICHA NO DISPONIBLE</p>
        <h1>No encontramos ese Pokémon.</h1>
        <Link className="back-link" to="/">Volver al catálogo</Link>
      </section>
    )
  }

  return (
    <section className="detail-page">
      <Link className="back-link" to="/">← Volver al catálogo</Link>
      <div className={`detail-panel type-${pokemon.types[0]}`}>
        <div className="detail-visual">
          <span className="detail-number">N.º {String(pokemon.id).padStart(3, '0')}</span>
          <img src={pokemon.image} alt={pokemon.name} />
          <div className="type-list">
            {pokemon.types.map((type) => <span className={`type-tag type-tag-${type}`} key={type}>{type}</span>)}
          </div>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">GUÍA DE CAMPO · FICHA POKÉMON</span>
          <h1>{pokemon.name}</h1>
          <p className="detail-description">Conoce más sobre este Pokémon: sus características, habilidades y estadísticas.</p>

          <div className="detail-facts">
            <div className="detail-fact"><span>ALTURA</span><strong>{(pokemon.height / 10).toFixed(1)} m</strong></div>
            <div className="detail-fact"><span>PESO</span><strong>{(pokemon.weight / 10).toFixed(1)} kg</strong></div>
          </div>

          <div className="detail-abilities">
            <h2>Habilidades</h2>
            <div className="ability-list">
              {pokemon.abilities.map((ability) => <span key={ability}>{ability.replaceAll('-', ' ')}</span>)}
            </div>
          </div>

          <div className="detail-stats">
            <h2>Estadísticas base</h2>
            {pokemon.stats.map(({ name, value }) => (
              <div className="stat-row" key={name}>
                <span>{name.replaceAll('-', ' ')}</span>
                <div className="stat-track"><span style={{ width: `${Math.min(100, (value / 180) * 100)}%` }} /></div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PokemonDetail