import { create } from "zustand"
import type { StateCreator } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import type { CartStore } from "./types/cartStore.types"

const store: StateCreator<CartStore> = (set) => ({
  cartItems: [],
  totalAmount: 0,

  addItem: (item, quantity = 1) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id)
      if (existingItemIndex > -1) {
        state.cartItems[existingItemIndex].quantity += quantity
      } else {
        state.cartItems.push({ ...item, quantity })
      }
      state.totalAmount += item.price * quantity

      return state
    })
  },

  removeItem: (id: string) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === id)
      if (existingItemIndex > -1) {
        state.totalAmount -= state.cartItems[existingItemIndex].price * state.cartItems[existingItemIndex].quantity
        state.cartItems.splice(existingItemIndex, 1)
      }
      return state
    })
  },

  updateQuantity: (id: string, quantity: number) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === id)
      if (existingItemIndex > -1 && quantity >= 0) {
        state.totalAmount +=
          (quantity - state.cartItems[existingItemIndex].quantity) * state.cartItems[existingItemIndex].price
        state.cartItems[existingItemIndex].quantity = quantity
      }
      return state
    })
  },

  clearCart: () => {
    set((state) => {
      state.cartItems = []
      state.totalAmount = 0

      return state
    })
  },
})

export const useCartStore =
  process.env.NODE_ENV !== "production"
    ? create<CartStore>()(devtools(immer(store)))
    : create<CartStore>()(immer(store))
