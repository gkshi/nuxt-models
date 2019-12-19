import Vue from 'vue'

Vue.directive('outside', {
  // When the bound element is inserted into the DOM...
  bind: (el, binding) => {
    const bubble = binding.modifiers.bubble
    const handler = e => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    if (typeof binding.value === 'function') {
      el.__vueOutside__ = handler
      document.addEventListener('click', handler)
    } else {
      const warn = '[Vue-outside]: Value must be a method name or anonymous function'
      console.warn(warn)
    }
  },
  unbind: el => {
    document.removeEventListener('click', el.__vueOutside__)
    el.__vueOutside__ = null
  }
})
