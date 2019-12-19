<template lang="pug">
  transition(name="modal")
    .modal-component(v-if="show" @click.self="close")
      dialog(:open="show")
        .close(@click="close")
          div X

        .title(v-if="$slots.title")
          slot(name="title")

        .content
          slot Modal default content

        .actions.buttons(v-if="$slots.actions")
          slot(name="actions")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'modal-component',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      modals: state => state.modals
    }),
    show () {
      return this.modals.includes(this.id)
    }
  },
  watch: {
    show () {
      this.show
        ? this.$emit('open')
        : this.$emit('close')
    }
  },
  methods: {
    close () {
      this.$store.dispatch('closeModal', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-component {
    // your custom styles here
  }
</style>
