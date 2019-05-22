<template>
  <div><slot/></div>
</template>
<script>
  import mapLayer from '@/components/map/mixins/mapLayer'

  export default {
    name: 'MapMarker',
    mixins: [mapLayer],
    props: {
      icon: Object,
      label: [String, Number],
      follow: Boolean
    },
    created () {
      this.instance = this.getMap().addMarker({
        ...this.position,
        icon: this.icon,
        label: this.label,
      })
    },
    watch: {
      icon (val) {
        this.instance.setIcon(val)
      },
      position (pos) {
        this.instance.setPosition(pos)
        if(this.follow) {
          let map =  this.getMap()
          if(pos && !map.boundsContain(pos)) {
            map.panTo(pos)
          }
        }
      },
      label (label) {
        this.instance.setLabel(label)
      }
    },
  }
</script>
