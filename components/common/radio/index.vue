<template lang="pug">
  .radio-component(:class="{ disabled }")
    input(
      :id="localId"
      :name="name"
      type="radio"
      :value.prop="value"
      :disabled="disabled"
      :checked.prop="checked"
      @change="change")
    label.flex.a-center(:for="localId")
      .box.flex.center(:class="{ 'margin': $slots.default }")
      slot
</template>

<script>
export default {
  name: 'radio-component',
  model: {
    event: 'change'
  },
  props: {
    id: String,
    name: String,
    value: {
      type: [String, Number],
      required: true
    },
    val: {
      type: [String, Number],
      required: true
    },
    disabled: Boolean,
    checked: Boolean
  },
  data () {
    return {
      localId: this.id
    }
  },
  methods: {
    change () {
      this.$emit('change', this.val)
    }
  },
  mounted () {
    this.localId = this.localId || Math.random().toFixed(7).slice(2)
    if (this.checked && this.val !== this.value) {
      this.$emit('change', this.val)
    }
  }
}
</script>
