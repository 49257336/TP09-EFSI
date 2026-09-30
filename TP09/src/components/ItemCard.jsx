import { Link } from 'react-router-dom'

function ItemCard({ pokemon, isFavorite, onToggleFavorite }) {
  const weight = Number(pokemon.weight) / 10

  return (
    <article className={`pokemon-card type-${pokemon.types[0]}`}>
      <Link
        className="pokemon-card-link"
        to={`/pokemon/${pokemon.id}`}
        aria-label={`Ver detalles de ${pokemon.name}`}
      />
      <div className="card-topline">
        <span className="pokemon-number">N.º {String(pokemon.id).padStart(3, '0')}</span>
        <button
          className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
          type="button"
          onClick={() => onToggleFavorite(pokemon.id)}
          aria-label={isFavorite ? `Quitar a ${pokemon.name} de favoritos` : `Añadir a ${pokemon.name} a favoritos`}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} loading="lazy" />
      <div className="card-info">
        <h3>{pokemon.name}</h3>
        <div className="card-details">
          <div className="type-list">
            {pokemon.types.map((type) => <span className={`type-tag type-tag-${type}`} key={type}>{type}</span>)}
          </div>
          <span className="pokemon-weight">
            Peso {Number.isFinite(weight) ? `${weight.toFixed(1)} kg` : 'No disponible'}
          </span>
        </div>
      </div>
      <span className="card-watermark" aria-hidden="true">{String(pokemon.id).padStart(3, '0')}</span>
    </article>
  )
}

export default ItemCard