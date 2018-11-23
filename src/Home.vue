<template>
  <div>
    <navbar :lang="lang"></navbar>
    <div class="container">
      <div class="jumbotron bg-white">
        <h1 class="display-3 d-none d-md-block text-center">
          {{$t('home.headline')}}
        </h1>
        <p class="lead my-5">
          {{$t('home.description')}}
        </p>

        <b-alert :show="failed" variant="danger">{{$t("error.refused")}}</b-alert>

        <b-card-group deck class="my-4" v-if="!failed">
          <div class="row row-eq-height w-100">
            <b-link class="col-md-4 my-2" :to="{name:'map.new'}" style="min-height: 40vh">
              <div class="card h-100 text-center pt-1">
                <div class="circle rounded-circle bg-primary mt-4 mx-auto">
                  <div class="content">
                    <span class="text-light display-4">+</span>
                  </div>
                </div>
                <h4 class="card-title text-secondary pt-auto mt-auto mb-0 pb-5">
                  {{$t("home.newMap")}}
                </h4>
              </div>
            </b-link>

            <div class="col-md-4" v-if="loading">
              <div class="container-spinner py-5">
                <div class="spinner"> </div>
                <p class="text-center mt-4">
                {{$t('Loading maps')}}
                </p>
              </div>
            </div>

            <b-link class="col-12 col-md-4 my-2" :to="{name:'map', params: {id: map.id}}" v-for="map in maps" :key="map.id">
              <b-card
                  :title="map.name"
                  :sub-title="map.datetime + '@' + map.place"
                  :img-src="map.thumbnail"
                  img-alt="Image"
                  align="center"
                  class="h-100"
                  >
              </b-card>
            </b-link>
          </div>
        </b-card-group>
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
      loading: false,
      failed: false,
      maps: []
    }
  },
  methods: {
    async fetchMaps() {
      this.loading = true;
      api.errorHandler = () => { this.failed = true}
      this.maps = await api.getAllMaps()
      this.loading = false;
    }
  },
  mounted() {
    this.fetchMaps()
  }
}
</script>


<style>
.circle {
  position: relative;
  width: 50%;
  height: 0;
  padding-top: 50%;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.content:before {
  content: '';
  vertical-align: middle;
  display: inline-block;
  width: 0;
  height: 100%;
}

.content span {
  vertical-align: middle;
  display: inline-block;
}
</style>
