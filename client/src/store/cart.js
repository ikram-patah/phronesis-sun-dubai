import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
    // {id: 'planId', quantity: 1}
  }),
  getters: {
    hasItems: (state) => Boolean(state.items.length)
  },
  actions: {
    addItem(item) {
      const itemIndex = this.items.findIndex((i) => i.id === item.id)
      if (itemIndex !== -1) {
        this.items[itemIndex].quantity += item.quantity
      } else {
        this.items.push(item)
      }
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id)
    }
  },
  persist: {
    enabled: true
  }
})
