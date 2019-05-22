<template>
  <div>
    <div ref="content">
      <slot/>
    </div>
  </div>
</template>
<script>
  import mapLayer from '@/components/map/mixins/mapLayer'
  import MapMarker from '@/components/map/MapMarker'

  export default {
    name: 'MapInfoWindow',
    mixins: [mapLayer],
    props: {
      parent: Object
    },
    data() {
      return {
        showing: true
      }
    },
    created () {
      let parent = this.parent
      let parentName = this.$parent.$options.name
      if(!parent && parentName == 'MapMarker') {
        parent = this.$parent.instance
      }
      this.instance = this.getMap().addInfoWindow(this.position, parent)
      this.instance.onClose(() => {
        this.showing = false
        this.$emit('close', this)
      })
    },
    mounted () {
      this.instance.setContent(this.$refs.content)
    },
    watch: {
      position (pos) {
        this.instance.setPosition(pos)
      },
      parent (p) {
        this.instance.setParent(p)
        this.instance.open()
      },
      showing (yes) {
        if(yes) {
          this.instance.open()
        } else {
          this.instance.close()
        }
      }
    },
  }
</script>
