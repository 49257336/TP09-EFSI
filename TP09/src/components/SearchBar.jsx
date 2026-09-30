function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busca por nombre o tipo..."
        aria-label="Buscar Pokémon por nombre o tipo"
      />
      <span className="search-shortcut" aria-hidden="true">POKÉDEX</span>
    </label>
  )
}

export default SearchBar