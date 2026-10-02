import { useState, useMemo } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...new Set(GUNS.map((g) => g.type))]

function Catalog({ addToCart }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  function toggleSort(criteria) {
    if (sortBy === criteria) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(criteria)
      setSortOrder('asc')
    }
  }

  const result = useMemo(() => {
    const list = GUNS.filter((gun) => {
      const matchName = gun.name.toLowerCase().includes(search.toLowerCase())
      const matchType = filter === 'All' || gun.type === filter
      return matchName && matchType
    })

    list.sort((a, b) => {
      let cmp = 0
      if (sortBy === 'name') {
        cmp = a.name.localeCompare(b.name)
      } else {
        cmp = a.price - b.price
      }
      return sortOrder === 'asc' ? cmp : -cmp
    })

    return list
  }, [search, filter, sortBy, sortOrder])

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="sort-bar">
          <span className="sort-label">Sort by:</span>
          <button
            type="button"
            className={`sort-btn${sortBy === 'name' ? ' active' : ''}`}
            onClick={() => toggleSort('name')}
          >
            Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button
            type="button"
            className={`sort-btn${sortBy === 'price' ? ' active' : ''}`}
            onClick={() => toggleSort('price')}
          >
            Price {sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </button>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{result.length} pieces</span>
        </div>
        <ul className="stock">
          {result.map((gun) => (
            <GunCard key={gun.name} gun={gun} addToCart={addToCart} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default Catalog