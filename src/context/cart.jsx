import { createContext, useReducer } from 'react';

export const CartContext = createContext();

const initialState = []
// JSON.parse(window.localStorage.getItem('cart')) || []

// const updateLocalStorage = state => {
//   window.localStorage.setItem('cart', JSON.stringify(state))
// }

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  
  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        // updateLocalStorage(newState)
        return newState
      }

      // const newState = 
      return [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]
      // updateLocalStorage(newState)
      // return newState
    }

    case 'REDUCE_FROM_CART': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        if (newState[productInCartIndex].quantity === 1) {
          newState.splice(productInCartIndex, 1)
        } else {
          newState[productInCartIndex].quantity -= 1
        }
        return newState
      }

      return state
    }


    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload

      const newState = state.filter(item => item.id != id)
      return newState

      // updateLocalStorage(newState)
    }

    case 'CLEAR_CART': {
      // updateLocalStorage(initialState)
      return initialState
    }
  }
    return state
}

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const reduceFromCart = product => dispatch({
    type: 'REDUCE_FROM_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({
    type: 'CLEAR_CART'
  })


  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        reduceFromCart,
        removeFromCart,
        clearCart
      }}>
      {children}
    </CartContext.Provider>
  )
}