import ItemList from './ItemList.jsx'

function Favorites({ items, favorites, onToggleFavorite }) {
  const favoriteItems = items.filter((pokemon) => favorites.includes(pokemon.id))

  return (
    <section className="favorites-section" id="favoritos">
      <div className="section-heading">
        <div><span className="eyebrow">TU EQUIPO PERSONAL</span><h2>Favoritos <span className="favorite-count">{favoriteItems.length}</span></h2></div>
        <span className="section-index">02 / COLECCIÓN</span>
      </div>
      {favoriteItems.length === 0
        ? <p className="favorites-empty">Aún no tienes favoritos. Pulsa el corazón de un Pokémon para guardarlo aquí.</p>
        : <ItemList items={favoriteItems} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
    </section>
  )
}

export default Favorites