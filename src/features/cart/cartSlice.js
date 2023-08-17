import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pizzas: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.pizzas.push(action.payload)
    },

    deleteItem(state, action) {
      state.pizzas = state.pizzas.filter(
        (item) => item.pizzaId !== action.payload,
      )
    },

    incItemQuantity(state, action) {
      const item = state.pizzas.find((item) => item.pizzaId === action.payload)
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },

    decItemQuantity(state, action) {
      const item = state.pizzas.find((item) => item.pizzaId === action.payload)
      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
    },

    clearCart(state) {
      state.pizzas = []
    },
  },
})

export default cartSlice.reducer
export const {
  addItem,
  deleteItem,
  incItemQuantity,
  decItemQuantity,
  clearCart,
} = cartSlice.actions

export const getCart = (state) => state.cart.pizzas

export const getTotalQuantity = (state) =>
  state.cart.pizzas.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalPrice = (state) =>
  state.cart.pizzas.reduce((sum, item) => sum + item.totalPrice, 0)

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.pizzas.find((item) => item.pizzaId === id)?.quantity ?? 0
