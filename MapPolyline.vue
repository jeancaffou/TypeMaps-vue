<script>
  import mapLayer from '@/components/map/mixins/mapLayer'

  export default {
    name: 'MapPolyline',
    mixins: [mapLayer],
    props: {
      path: Array,
      color: String,
    },
    created () {
      this.instance = this.getMap().addPolyline({
        path: this.getPath(this.path),
        color: this.color,
        weight: 5,
        animated: true,
      })
    },
    methods: {
      getPath(pathArray) {
        let path = pathArray.map(pos => {
          return {lat: pos.latitude, lon: pos.longitude}
        })
        return path
      }
    },
    watch: {
      path (val) {
        this.instance.setPath(this.getPath(val))
      },
    },
    render () {
      return null
    }
  }
</script>
