<template lang="pug">
  .textarea-component(:class="{ 'textarea-component-error': error }")
    label(v-if="$slots.default" :for="localId")
      slot
    textarea(
      ref="field"
      :id="localId"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :autofocus="autofocus"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
      @keyup="$emit('keyup', $event)"
      @paste="paste")
    .error(v-if="error") {{ errorText }}
</template>

<script>
export default {
  name: 'textarea-component',
  props: {
    id: String,
    value: [String, Number],
    error: [String, Boolean],
    placeholder: String,
    autofocus: Boolean,
    readonly: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      localId: this.id
    }
  },
  computed: {
    errorText () {
      return typeof this.error === 'string' ? this.error : 'Error'
    }
  },
  methods: {
    focus () {
      this.$nextTick(() => {
        this.$refs.field.focus()
      })
    },
    paste (e) {
      e.preventDefault()
      const value = e.clipboardData.getData('Text')
      this.$emit('input', value)
      this.$emit('paste', value)
    }
  },
  mounted () {
    this.localId = this.localId || Math.random().toFixed(7).slice(2)
    if (this.autofocus) {
      this.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  .textarea-component {
    label {
      display: block;
    }
    textarea {
      display: block;
      max-width: 100%;
    }
  }
</style>
