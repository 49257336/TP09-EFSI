import ItemList from '../components/ItemList.jsx'
import SearchBar from '../components/SearchBar.jsx'

function Home({ count, items, query, onQueryChange, favorites, onToggleFavorite, loading, error }) {
  return (
    <>
      <section className="intro-section">
        <div className="intro-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> GUÍA DE CAMPO · REGIÓN KANTO</span>
          <h1>Conócelos<br />a <span>todos.</span></h1>
          <p>Una pequeña guía para grandes aventuras.<br className="desktop-break" /> Explora, descubre y reúne a tus favoritos.</p>
        </div>
        <div className="intro-art" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="pokeball"><span /></div>
          <span className="art-label">N.º 001 — N.º {String(count || 150).padStart(3, '0')}</span>
        </div>
        <div className="intro-index"><span>01</span><span className="index-line" /><span>{String(count || 150).padStart(3, '0')}</span></div>
      </section>

      <section className="collection-section" id="explorar">
        <div className="section-heading">
          <div><span className="eyebrow">CATÁLOGO POKÉMON</span><h2>Primeros encuentros <span className="heading-dot">.</span></h2></div>
          <span className="section-index">01 / EXPLORAR</span>
        </div>
        <SearchBar value={query} onChange={onQueryChange} />
        {loading && <p className="feedback" role="status"><span className="loading-ball" /> Cargando información...</p>}
        {!loading && error && <div className="error-message" role="alert"><p>{error}</p><button type="button" onClick={() => window.location.reload()}>Volver a intentar ↗</button></div>}
        {!loading && !error && <ItemList items={items} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      </section>
    </>
  )
}

export default Home