import { Link, NavLink } from 'react-router-dom'

function Header({ count }) {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Pokédex, inicio">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span>Pokédex<span className="brand-period">.</span></span>
      </Link>
      <div className="header-meta">{count ? `${count} ENTRADAS` : 'CONECTANDO'}</div>
      <nav className="header-nav" aria-label="Navegación principal">
        <NavLink className={({ isActive }) => `header-link${isActive ? ' is-active' : ''}`} to="/" end>Explorar</NavLink>
        <NavLink className={({ isActive }) => `header-link${isActive ? ' is-active' : ''}`} to="/favoritos">
          Favoritos <span aria-hidden="true">↗</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header