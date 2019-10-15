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

      var mode = this.$route.name == 'map.bbox' ? 'bbox' : ''
      if (!this.view) {
        this.view = new View('map', this.model, mode)
        this.view.on('modeChanged', e => {

          console.log("changing to mode=" + e.value, e);

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
