<!-- Map alone is a reserverd keyword therefor we use MapMap as name -->

<template>
  <div id="map" class="w-100 h-100" v-pre></div>
</template>

<script>
import {View} from 'aktionskarten.js'

export default {
  props: ['api', 'model', 'secret'],
  data() {
    return {
      view: null,
    }
  },
  watch: {
    '$route': 'render',
    'model': 'render'
  },
  methods: {
    async render () {
      console.log("rendering", this.view, this.model)
      if (!this.view && this.model) {
        var mode = !this.model.bbox || this.$route.name == 'map.bbox' ? 'bbox' : ''
        console.log("mode:", this.$route.name, mode)
        this.view = new View('map', this.model, mode)
        this.view.on('modeChanged', (mode) => console.log("mode changed to " + mode))
        await this.view.init();
      }
    }
  }
}
</script>
