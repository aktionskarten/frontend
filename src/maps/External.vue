<template>
  <div id="map" class="w-100 h-100" v-pre></div>
</template>

<script>
import {View} from 'aktionskarten.js'
import {Api, MapModel} from 'aktionskarten.js'

//var api = new Api('https://staging.aktionskarten.org') //process.env.API_ENDPOINT)
var api = new Api(process.env.API_ENDPOINT)

export default {
  props: ['lang'],
  data() {
    return {
      api: api,
      model: null,
      view: null,
    }
  },
  watch: {
    '$route': 'render',
    'model': 'render',
  },
  mounted () {
    this.render();
  },
  methods: {
    async render () {
      let id = this.$route.params.id
      if (!id || (this.model && this.model.id == id)) {
        return;
      }

      this.model = await MapModel.get(api, id)
      if (!this.model) {
        console.warn("aborting no model");
        return;
      }

      if (!this.view) {
        this.view = new View('map', this.model)
        await this.view.init(this.lang);
      }
    }
  }
}
</script>

<style>
html, body{
  height: 100%;
}
</style>
