import { defineStore } from 'pinia'

import { IAppState } from './interfaces'

export const useAppStore = defineStore('app', {
  state: (): IAppState => ({
    sideNavigationBarActive: false,
    editingComponent: null
  }),

  getters: {
    sideBar: (state) => state.sideNavigationBarActive,
    edition: (state) => state.editingComponent
  },

  actions: {
    toogleBar() {
      this.$patch({
        sideNavigationBarActive: !this.sideNavigationBarActive
      })
    },
    activateEdition(id: string) {
      this.$patch({
        editingComponent: id
      })
    },
    desactivateEdition() {
      this.$patch({
        editingComponent: null
      })
    }
  }
})