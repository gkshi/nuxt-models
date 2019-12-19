export const state = () => ({
  modals: []
})

export const actions = {
  openModal ({ commit }, id) {
    commit('MODAL_ADD', id)
  },
  closeModal ({ commit }, id) {
    commit('MODAL_REMOVE', id)
  },
  closeAllModals ({ commit }) {
    commit('MODAL_CLEAR')
  }
}

export const mutations = {
  MODAL_ADD (state, id) {
    state.modals.push(id)
  },
  MODAL_REMOVE (state, id) {
    state.modals = state.modals.filter(i => i !== id)
  },
  MODAL_CLEAR (state) {
    state.modals = []
  }
}

export const getters = {
  //
}

export default {
  state,
  actions,
  mutations,
  getters
}
