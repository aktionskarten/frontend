<template>
  <div>
    <navbar :lang="lang"></navbar>
    <div class="container">
      <div class="jumbotron bg-white">
        <h1 class="display-4">
          {{$t('home.headline')}}
        </h1>
        <p class="lead">
          {{$t('home.description')}}
          <br />
          <br />
          {{$t('home.mapListing')}}
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
import {api} from '@/api.js'

export default {
  name: 'home',
  components: {'navbar': NavBar},
  props: ['lang'],
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
