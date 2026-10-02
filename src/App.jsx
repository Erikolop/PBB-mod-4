import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  function addToCart(gun) {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.name === gun.name)
      if (idx !== -1) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 }
        return next
      }
      return [...prev, { ...gun, qty: 1 }]
    })
  }

  function updateQty(name, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  function removeFromCart(name) {
    setCart((prev) => prev.filter((item) => item.name !== name))
  }

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        cart={cart}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
      />

      <main className="main">
        {tab === 'Catalog' && <Catalog addToCart={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />
    </div>
  )
}

export default App