<template>
  <div class="controls" ref="mapControls">
    <v-tooltip right>
      <div @click.stop="toggleSearch" slot="activator">
        <v-icon :size="height">search</v-icon>
      </div>
      <span>{{$t('map.addressSearch')}}</span>
    </v-tooltip>
    <v-tooltip right>
      <div @click.stop="zoomin" slot="activator">
        <v-icon :size="height">add</v-icon>
      </div>
      <span>{{$t('map.zoomin')}}</span>
    </v-tooltip>
    <v-tooltip right>
      <div @click.stop="zoomout" slot="activator">
        <v-icon :size="height">remove</v-icon>
      </div>
      <span>{{$t('map.zoomout')}}</span>
    </v-tooltip>
    <!--
    <v-tooltip right>
      <div slot="activator">
        <img src="static/svg-icons/follow.svg" :height="height"/>
      </div>
      <span>{{$t('map.followVehicle')}}</span>
    </v-tooltip>
    -->
    <v-tooltip right>
      <div @click.stop="$emit('fullscreen')" slot="activator">
        <img src="static/svg-icons/fullscreen.svg" :height="height"/>
      </div>
      <span>{{$t('map.fullscreen')}}</span>
    </v-tooltip>
    <v-tooltip right>
      <div slot="activator">
        <img src="static/svg-icons/lock.svg" :height="height"/>
      </div>
      <span>{{$t('map.lockView')}}</span>
    </v-tooltip>
    <!--
    <v-tooltip right>
      <div slot="activator">
        <img src="static/svg-icons/weather.svg" :height="height"/>
      </div>
      <span>{{$t('map.showWeather')}}</span>
    </v-tooltip>
    -->
    <v-tooltip right>
      <div @click.stop="toggleTraffic" slot="activator">
        <img src="static/svg-icons/traffic.svg" :height="height"/>
      </div>
      <span>{{$t('map.showTraffic')}}</span>
    </v-tooltip>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import * as MUTATE from '@/store/constants/mutations'
  export default {
    name: 'MapControls',
    inject: ['getMap'],
    data: () => ({
      height: 19
    }),
    methods: {
      ...mapMutations({
        toggleTraffic: MUTATE.MAP_TOGGLE_TRAFFIC,
        toggleSearch: MUTATE.SHOW_SEARCH
      }),
      zoomin () {
        this.getMap().setZoom(this.getMap().getZoom() + 1)
      },
      zoomout () {
        this.getMap().setZoom(this.getMap().getZoom() - 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .controls {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px;
    background: white;
    display: flex;
    flex-direction: column;

    div {
      padding-bottom: 5px;
      text-align: center;
    }

    > * {
      cursor: pointer;
    }
  }
</style>
