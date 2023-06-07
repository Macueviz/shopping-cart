import './Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart'

// eslint-disable-next-line react/prop-types
function CartItem({ thumbnail, price, title, quantity, addToCart,reduceFromCart }) {


  return (
    <>
      <ul>
        <li>
          <img
            src={thumbnail}
            alt={title}
          />
          <div>
            <strong>{title}</strong>-${price}
          </div>

          <footer>
            <small>Qty: {quantity}</small>
            <button
              onClick={addToCart}>
              +
            </button>
            <button
              onClick={reduceFromCart}>
              -
            </button>
          </footer>
        </li>
      </ul>
    </>
  )
}

export function Cart() {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart , reduceFromCart} = useCart()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              reduceFromCart={() => reduceFromCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button className='clear-button' onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}