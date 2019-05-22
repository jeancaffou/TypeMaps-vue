/**
 * @project MyGPService v4
 * @author Žan Kafol on 7.1.2019
 */

import Vue from 'vue'
import Component from 'vue-class-component'
import {GoogleMap} from './model/GoogleMap'
import {MapInterface, MapPosition} from './model/MapInterface'
import {Emit, Prop, Provide, Watch} from 'vue-property-decorator'

@Component
export default class Map extends Vue {
  public map: MapInterface<any>
  public ready = false

  @Prop({default: false})
  public fitBounds: MapPosition[]

  @Prop({default: 'roadmap'})
  public mapType: string

  @Prop({default: () => {return {lat: 45, lon: 15, zoom: 8}}})
  public center: MapPosition

  @Watch('mapType')
  public onLayerChanged(newLayer: string) {
    this.map.setMapType(newLayer)
  }

  @Watch('center', {deep: true})
  @Emit('centerChanged')
  public onCenterChanged(newCenter: MapPosition) {
    if(this.ready && newCenter) {
      this.map.panTo(newCenter)
      if(newCenter.zoom) {
        this.map.setZoom(newCenter.zoom)
      }
      return newCenter
    }
  }

  @Watch('fitBounds')
  public onBoundsChanged(bounds: MapPosition[]) {
    if(this.ready && bounds) {
      this.map.fitBounds(bounds)
    }
  }

  @Provide()
  public getMap(): MapInterface<any> {
    if(this.ready) {
      return this.map
    } else {
      console.error('Map not ready')
    }
  }

  @Emit('drag')
  public onDrag () {
    return this.center
  }

  @Emit('load')
  public mounted () {
    // @ts-ignore
    this.map = new GoogleMap(process.env.GOOGLE_API_KEY)
    this.map.onDrag(this.onDrag)
    return this.map.init(this.$refs.map, {
      lat: this.center.lat,
      lon: this.center.lon, zoom:
      this.center.zoom
    }).then(() => {
      this.ready = true
    })
  }
}
