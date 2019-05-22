<template>
  <input class="search elevation-10" ref="search" :placeholder="$t('map.addressSearch')" />
</template>
<script>
  export default {
    name: 'MapSearch',
    data () {
      return {
        gac: null,
        query: ''
      }
    },
    mounted () {
      this.gac = new google.maps.places.Autocomplete(this.$refs.search)
      this.gac.addListener('place_changed', () => {
        let place = this.gac.getPlace()
        let lat = place.geometry.location.lat()
        let lon = place.geometry.location.lng()
        this.$emit('select', {lat, lon, address: place.formatted_address})
      })
    }
  }
</script>

<style scoped>
  .search {
    padding: 15px 15px;
    background: white;
    width: 300px;
  }
</style>
