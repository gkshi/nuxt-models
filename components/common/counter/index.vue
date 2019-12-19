<template lang="pug">
  .counter-component
    label(:for="localId")
      slot
    .flex
      .minus(@click="minus")
        div -

      input(
        ref="input"
        :id="localId"
        type="number"
        :value.number="value"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :readonly="readonly"
        :disabled="disabled"
        @input="input"
        @change="change"
        :min.prop="min ? min : !negative ? 0 : false"
        :max.prop="max ? max : false"
        @focus="$emit('focus', $event.target.value)"
        @blur="blur")

      .plus(@click="plus")
        div +
</template>

<script>
export default {
  name: 'counter-component',
  props: {
    id: String,
    value: [String, Number],
    step: {
      type: Number,
      default: 1
    },
    inputDelay: {
      type: Number,
      default: 300
    },
    min: [Number, String],
    max: [Number, String],
    placeholder: String,
    autofocus: Boolean,
    negative: Boolean,
    readonly: Boolean,
    disabled: Boolean
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      localId: this.id,
      timeout: null,
      localMin: this.min
    }
  },
  methods: {
    validate (value) {
      value = parseInt(value)
      if (isNaN(value) || typeof value !== 'number') {
        return 0
      }
      if (!this.negative) {
        value = value > 0 ? value : 0
      }
      if (this.min) {
        value = value > +this.min ? value : +this.min
      }
      if (this.max) {
        value = value < +this.max ? value : +this.max
      }
      return value
    },
    paste (e) {
      e.preventDefault()
      const val = Number(e.clipboardData.getData('Text'))
      this.$emit('change', this.validate(val))
    },
    input (e) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('change', this.validate(e.target.value))
      }, this.inputDelay)
    },
    change (e) {
      this.$emit('change', this.validate(e.target.value))
    },
    blur (e) {
      clearTimeout(this.timeout)
      this.$emit('blur', e.target.value)
    },
    minus () {
      this.$emit('change', this.validate(+this.value - this.step))
    },
    plus () {
      this.$emit('change', this.validate(+this.value + this.step))
    }
  },
  mounted () {
    this.localId = this.localId || Math.random().toFixed(7).slice(2)
    this.$refs.input.addEventListener('paste', this.paste)
  }
}
</script>

<style lang="scss" scoped>
  .counter-component {
    label {
      display: block;
    }
    input {
      display: block;
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      -moz-appearance: textfield;
      &:hover,
      &:focus {
        -moz-appearance: number-input;
      }
    }
  }
</style>
