export default {
  inject: ['getMap'],

  props: {
    position: Object
  },

  methods: {
    onClick (e) {
      this.$emit('click', this, e)
    }
  },

  mounted () {
    this.instance.addListener('click', this.onClick)
  },

  beforeDestroy () {
    if(this.instance.onDestroy) {
      this.instance.onDestroy()
    }
    this.getMap().removeLayer(this.instance)
  },
}
