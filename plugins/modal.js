import Vue from 'vue'

const modalMixin = {
  methods: {
    openModal (id) {
      if (!id) {
        return
      }
      this.$store.dispatch('openModal', id)
    },
    closeModal (id) {
      if (!id) {
        return
      }
      this.$store.dispatch('closeModal', id)
    },
    closeAllModals () {
      this.$store.dispatch('closeAllModals')
    }
  }
}

Vue.mixin(modalMixin)
