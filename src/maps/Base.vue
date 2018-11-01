<template>
  <div class="w-100 h-100">
    <navbar>
      <template slot="name" v-if="model">{{model.name}}</template>
      <template v-if="model">
        <b-navbar-nav>
          <b-nav-item :to="{name: 'map.edit', params: {id: model.id, secret: secret}}">Meta</b-nav-item>
          <b-nav-item :to="{name: 'map', params: {id: model.id, secret: secret}}">Karte</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Share" right>
            <b-dropdown-item :href="model.exports.pdf">PDF</b-dropdown-item>
            <b-dropdown-item :href="model.exports.svg">SVG</b-dropdown-item>
            <b-dropdown-item :href="model.exports.png">PNG</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </template>
    </navbar>

    <router-view :api="api" :model="model" :secret="secret"></router-view>
  </div>
</template>

<script>
import NavBar from '@/NavBar.vue'
import {Api, MapModel} from 'aktionskarten.js'

var api = new Api(process.env.API_ENDPOINT)

export default {
  name: 'app',
  components: {'navbar': NavBar},
  data() {
    return {
      api: api,
      model: null,
      secret: null,
    }
  },
  async mounted () {
    console.log("MapBase mounted");
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
    'secret': 'login'
  },
  methods: {
    login (secret) {
      console.log("log in")
      this.model.auth(secret);
    },
    async fetchData () {
      if (!this.$route.params.id) {
        return;
      }

      this.model = await MapModel.get(api, this.$route.params.id)

      // log-in if we have credentials
      if (this.$route.params.secret) {
        this.login(this.secret)
        this.secret = this.$route.params.secret
      }
    }
  }
}
</script>

<style>
html{
  height: 100%;
}

body {
  height: calc(100% - 60px);
}
</style>
