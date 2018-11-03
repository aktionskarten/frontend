<!-- Map alone is a reserverd keyword therefor we use MapMap as name -->

<template>
  <div id="map" class="w-100 h-100" v-pre></div>
</template>

<script>
import {View} from 'aktionskarten.js'

export default {
  props: ['api', 'model', 'secret', 'lang'],
  data() {
    return {
      view: null,
    }
  },
  watch: {
    '$route': 'render',
    'model': 'render',
    'lang': function() { window.location.reload() }
  },
  mounted () {
    console.log("MapLeaflet mounted");
    this.render();
  },
  methods: {
    async render () {
      if (!this.model) {
        console.warn("aborting no model");
        return;
      }

      var mode = this.$route.name == 'map.bbox' ? 'bbox' : ''
      if (!this.view) {
        this.view = new View('map', this.model, mode)
        this.view.on('modeChanged', e => {
          console.log("changing to mode=",e.value);
          let params = {id: this.model.id, secret: this.secret, lang: this.lang};
          let name = e.value == 'bbox' ? 'map.bbox' : 'map';
          this.$router.push({name: name, params: params})
        })

        await this.view.init(this.lang);
      } else {
        this.view.mode = mode;
      }
    }
  }
}
</script>
