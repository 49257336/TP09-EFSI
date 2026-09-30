import ItemCard from './ItemCard.jsx'

function ItemList({ items, favorites, onToggleFavorite }) {
  if (items.length === 0) return <p className="empty-state">No encontramos Pokémon con esa búsqueda.</p>

  return (
    <div className="pokemon-grid">
      {items.map((pokemon) => (
        <ItemCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favorites.includes(pokemon.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default ItemList