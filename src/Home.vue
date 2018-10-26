<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <h1 class="m-5 text-center">Kartographische Aktion</h1>

      <p class="text-center">
        Die Kartographische Aktion soll dir ermöglichen Karten für Demos oder
        anderer Aktionsformen zu erstellen. Solche sogenannten Aktionskarten
        helfen dir und deinen Mitstreiter*innen sich am Ort des Geschehens
        zurechtzufinden.
      </p>

      <div class="row bg-light">
        <b-card-group deck class="m-2">
          <b-link class="col-4 my-3 p-0" :to="{name:'map', params: {id: map.id}}" v-for="map in maps">
            <b-card
                :title="map.name"
                :sub-title="map.datetime + '@' + map.place"
                :img-src="map.thumbnail"
                img-alt="Image"
                align="center"
                >
              <p class="card-text">
                {{map.description}}
              </p>
            </b-card>
          </b-link>
        </b-card-group>
      </div>
    </div>

  </div>
</template>

<script>

import NavBar from '@/NavBar.vue'
import {Api} from 'aktionskarten.js'

console.log(process.env)
var api = new Api(process.env.API_ENDPOINT)

export default {
  name: 'home',
  components: {'navbar': NavBar},
  data () {
    return {
      maps: []
    }
  },
  methods: {
    async fetchMaps() {
      this.maps = await api.getAllMaps()
    }
  },
  mounted() {
    this.fetchMaps()
  }
}
</script>
