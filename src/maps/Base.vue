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

          <b-nav-form>
            <b-btn  v-if="!model.authenticated" size="sm" variant="primary"  v-b-modal.modalLogin>
              Login
            </b-btn>
            <b-btn  v-if="model.authenticated" size="sm" variant="primary"  @click="logout()">
              Logout
            </b-btn>
          </b-nav-form>
        </b-navbar-nav>
      </template>
    </navbar>

    <b-modal id="modalLogin" ref="modal" size="sm" title="Authorisierung" ok-title="Log in" @ok="tryLogin" centered>
      <div class="container">
        <b-form @submit.stop.prevent="login">
           <b-form-input id="inputToken" :state="inputSecretState" placeholder="Admin Token" v-model.trim="inputSecret"></b-form-input>
        </b-form>
      </div>
    </b-modal>

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
      model: {},
      secret: null,
      inputSecret: '',
      inputSecretState: null
    }
  },
  async mounted () {
    console.log("MapBase mounted");
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async tryLogin(evt) {
      evt.preventDefault();
      if (await this.login(this.inputSecret)) {
        this.inputSecret = ''
        this.inputSecretState = null;
        this.$refs.modal.hide()
      } else {
        console.warn("login failed");
        this.inputSecretState = false;
      }
    },
    logout () {
      this.model.logout();
      this.secret = null;
    },
    async login (secret) {
      if (secret) {
        if (await this.model.login(secret)) {
          this.secret = secret;
          let params = {id: this.model.id, secret: secret};
          this.$router.replace({name: this.$route.name, params: params})
          return true;
        }
      }
      return false;
    },
    async fetchData () {
      let id = this.$route.params.id
      if (!id) {
        return;
      }

      this.model = await MapModel.get(api, id)

      this.model.on('authenticated', (e) => {
        let authenticated = e.value
        if (!authenticated) {
          let params = {params: {id: this.model.id}};
          this.$router.replace({name: this.$route.name, params: params})
        }
      });

      // log-in if we have credentials
      if (this.$route.params.secret) {
        let secret = this.$route.params.secret
        this.login(secret);
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

.b-nav-dropdown{
 z-index: 9999
}
</style>
