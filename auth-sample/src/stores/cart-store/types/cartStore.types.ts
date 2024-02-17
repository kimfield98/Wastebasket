export type CartItem = {
  id: string
  name: string
  price: number
  url: string
  thumbnailUrl: string
  quantity: number
}

export type CartStore = {
  cartItems: CartItem[]
  totalAmount: number
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}
