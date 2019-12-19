<template lang="pug">
  .tabs-component
    div
      .inline-flex.column
        .tabs.flex.a-center(:class="{ 'disabled': disabled }")
          .tab(
            v-for="tab in tabs"
            :class="{ 'active': isActive(tab), 'disabled': tab.disabled }"
            :key="tab.id"
            @click="setActive(tab)") {{ tab.label || tab.id }}
        .line(v-if="!noLine")
          .indicator(:style="indicatorStyle")
    .content(ref="content")
      slot
</template>

<script>
export default {
  name: 'tabs-component',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    disabled: Boolean,
    noLine: Boolean
  },
  data () {
    return {
      active: null,
      indicator: {
        width: 0,
        left: 0
      }
    }
  },
  computed: {
    indicatorStyle () {
      return `width: ${this.indicator.width}px; left: ${this.indicator.left}px`
    }
  },
  watch: {
    active () {
      if (!this.noLine) {
        this.moveIndicator()
      }
      this.showTabContent()
      this.$emit('change', this.active)
    }
  },
  methods: {
    isActive (tab) {
      return this.active === tab.id
    },
    setActive (tab) {
      if (this.disabled || tab.disabled) {
        return
      }
      this.active = tab.id
    },
    findActive () {
      let active = null
      this.tabs.every(tab => {
        if (tab.active) {
          active = tab
          return false
        }
        return true
      })
      return active || this.tabs[0]
    },
    showTabContent () {
      this.$refs.content.childNodes.forEach(i => {
        // eslint-disable-next-line eqeqeq
        if (i.dataset.tab == this.active) {
          i.classList.add('tab-content-active')
          return
        }
        i.classList.remove('tab-content-active')
      })
    },
    moveIndicator () {
      // nextTick, потому что ищем активный элемент по классу .active
      this.$nextTick(() => {
        const activeTabEl = this.$el.querySelector('.tab.active')
        this.indicator.width = activeTabEl.offsetWidth
        this.indicator.left = activeTabEl.offsetLeft
      })
    }
  },
  mounted () {
    this.setActive(this.findActive())

    if (!this.noLine) {
      window.addEventListener('resize', this.moveIndicator)
    }
  },
  beforeDestroy () {
    if (!this.noLine) {
      window.removeEventListener('resize', this.moveIndicator)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabs-component {
    //
  }
</style>
