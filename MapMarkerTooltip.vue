<script>
  import mapLayer from '@/components/map/mixins/mapLayer'

  export default {
    name: 'MapMarkerTooltip',
    mixins: [mapLayer],
    props: {
      offset: {
        type: Object,
        default () {
          return {x: 0, y: 0}
        }
      },
      active: Boolean
    },
    created () {
      this.instance = this.getMap().addMarkerOverlay(this.position, this.offset)
    },
    watch: {
      position (pos) {
        this.instance.setPosition(pos)
      },
      active (a) {
        if(a) {
          this.instance.div.setAttribute('class', 'vehicle_label selected')
        } else {
          this.instance.div.setAttribute('class', 'vehicle_label')
        }
      }
    },
    render (createElement) {
      let elInner = createElement('div', this.$slots.default);
      let el = createElement('div', {}, [elInner]);
      this.$nextTick(() => {
        if (this.$el && this.$el.firstChild && this.instance.div.firstChild !== this.$el.firstChild) {
          this.instance.div.firstChild && this.instance.div.removeChild(this.instance.div.firstChild);
          this.instance.div.appendChild(this.$el.firstChild);
          if(this.active) {
            this.instance.div.setAttribute('class', 'vehicle_label selected')
          } else {
            this.instance.div.setAttribute('class', 'vehicle_label')
          }
        }
      })
      return el
    }
  }
</script>
