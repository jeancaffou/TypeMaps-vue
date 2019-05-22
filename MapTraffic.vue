<script>
  import mapLayer from '@/components/map/mixins/mapLayer'

  export default {
    name: 'MapTraffic',
    mixins: [mapLayer],
    created () {
      this.instance = this.getMap().addTraffic()
    },
    render () {
      return null
    }
  }
</script>
