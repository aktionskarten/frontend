<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="jumbotron bg-white">
        <h1 class="display-4">Karten für die direkte Aktion</h1>
        <p class="lead">
          Eine Aktionskarte besteht aus einem Kartenausschnitt in dem wichtige
          Informationen wie eine Demoroute oder interessante Orte markiert sind.
          So eine Karte soll dir und deinen Mitstreiter*innen helfen sich am Ort
          des Geschehens leichter zurechtzufinden.
          <br />
          <br />
          Im folgenden findest bereits erstellte öffentliche Karten:
        </p>

        <div class="row ">
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
