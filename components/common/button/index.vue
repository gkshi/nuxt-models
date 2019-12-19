<template lang="pug">
  .button-component(@click="click" :class="{ disabled }")
    a.button(
      v-if="href"
      :class="classList"
      role="button"
      :href="href"
      :target="target"
      @focus="$emit('focus')"
      @blur="$emit('blur')")
      slot
    nuxt-link.button(
      v-else-if="to"
      :class="classList"
      role="button"
      :to="to"
      @focus="$emit('focus')"
      @blur="$emit('blur')")
      slot
    button.button(
      v-else
      :class="classList"
      role="button"
      :form="form"
      :type="native"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      :disabled="disabled")
      slot
</template>

<script>
export default {
  name: 'button-component',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    },
    native: {
      type: String,
      default: 'button' // native button type (submit, confirm)
    },
    form: String,
    href: String,
    to: String,
    target: {
      type: String,
      default: '_blank' // _blank, _self
    },
    disabled: Boolean
  },
  computed: {
    classList () {
      return `button-type-${this.type} button-size-${this.size}`
    }
  },
  methods: {
    click (e) {
      if (this.disabled) {
        return e
      }
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-component {
    //
  }
</style>
