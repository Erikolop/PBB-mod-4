import { useState } from 'react'

const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cart, updateQty, removeFromCart }) {
  const [cartOpen, setCartOpen] = useState(false)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          className="cart-toggle"
          onClick={() => setCartOpen((prev) => !prev)}
        >
          🛒
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </nav>

      {cartOpen && (
        <div className="cart-panel">
          <h3 className="cart-title">Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.name} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">
                        ${(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                    <div className="cart-item-controls">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQty(item.name, -1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQty(item.name, +1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFromCart(item.name)}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Total</span>
                <span className="cart-total-price">${totalPrice.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header