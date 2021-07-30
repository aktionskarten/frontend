<template>
<div class="w-100 h-100">
  <div id="map" class="w-100 h-100" v-pre></div>
  <navsteps v-if="model" :model="model" :absolute="true" :secret="secret" :lang="lang"></navsteps>
</div>
</template>

<script>
import {View} from 'aktionskarten.js'
import {api} from '@/api.js'
import NavSteps from '@/maps/NavSteps.vue'

export default {
  props: ['model', 'secret', 'lang'],
  components: {'navsteps': NavSteps},
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
    this.render();
  },
  methods: {
    async render () {
      if (!this.model || !this.model.id) {
        console.warn("aborting no model");
        return;
      }

      const getMode = (name) => name == 'map.bbox' ? 'bbox' : ''
      const getRoute = (mode) => mode == 'bbox' ? 'map.bbox' : 'map'

      const currentMode = getMode(this.$route.name)
      if (this.view) {
        this.view.mode = currentMode;
        return;
      }

      this.view = new View('map', this.model, currentMode)
      this.view.on('modeChanged', e => {
        let route = getRoute(e.value)

        if (route == this.$route.name) {
          console.warn("already in this mode. ignoring.");
          return;
        }

        let params = {id: this.model.id, secret: this.secret, lang: this.lang};
        this.$router.push({name: route, params: params})
      })

      await this.view.init(this.lang);
    }
  }
}
</script>
