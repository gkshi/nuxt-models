<template lang="pug">
  .checkbox-component(:class="{ disabled, 'checkbox-component-error': error }")
    .flex.a-center.shrink
      input(
        type="checkbox"
        :id="localId"
        :value="value"
        :class="[classes]"
        :indeterminate.prop="indeterminate"
        :checked="checkboxState"
        :required="required"
        :disabled="disabled")
      label.flex.a-center(:for="localId" @click.prevent="toggle")
        .box.flex.center(:class="{ 'margin': !!$slots.default }")
          iconCheck.check
        slot
    .error(v-if="error") {{ errorText }}
</template>

<script>
import iconCheck from './icon'

export default {
  name: 'checkbox-component',
  components: {
    iconCheck
  },
  model: {
    prop: 'model',
    event: 'change'
  },
  props: {
    id: String,
    model: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Array,
      default: undefined
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    indeterminate: Boolean,
    checked: Boolean,
    error: [String, Boolean],
    required: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      localId: this.id
    }
  },
  computed: {
    checkboxState () {
      if (this.model === undefined) { return this.value }
      if (Array.isArray(this.model)) { return this.model.includes(this.value) }
      return this.model || this.value
    },
    classes () {
      return {
        indeterminate: this.indeterminate
      }
    },
    errorText () {
      return typeof this.error === 'string' ? this.error : 'Error'
    }
  },
  methods: {
    toggle () {
      if (this.disabled) { return }

      let value = this.model || this.value

      if (Array.isArray(value)) {
        const i = value.indexOf(this.value)
        if (i === -1) { value.push(this.value) } else { value.splice(i, 1) }
      } else { value = !this.checkboxState }

      this.$emit('change', value)
    }
  },
  watch: {
    checked (v) {
      if (v !== this.checkboxState) { this.toggle() }
    }
  },
  beforeMount () {
    if (!this.id) {
      this.localId = Math.random().toFixed(7).slice(2)
    }
  },
  mounted () {
    if (this.checked && !this.checkboxState) {
      this.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkbox-component {
    //
  }
</style>
