<template>
  <div class="w-100 h-100">
    <navbar :lang="lang">
      <template slot="name" v-if="model">{{model.name}}</template>
      <template v-if="model">
        <b-navbar-nav>
          <b-nav-item :to="{name: 'map.edit', params: {id: model.id, secret: secret}}">{{$t('navbar.form')}}</b-nav-item>
          <b-nav-item :to="{name: 'map', params: {id: model.id, secret: secret}}">{{$t('navbar.map')}}</b-nav-item>
          <b-nav-item v-if="model.authenticated" :to="{name: 'map.preview', params: {id: model.id, secret: secret}}">{{$t('navbar.preview')}}</b-nav-item>
        </b-navbar-nav>
      </template>

      <template slot="navbar" v-if="model">
        <b-navbar-nav class="ml-auto" v-if="model && model.exports">
          <b-nav-item-dropdown :text="$t('navbar.share.label')" right>
            <b-dropdown-item @click="showModalShareSocial=true">{{$t('navbar.share.social.link')}}</b-dropdown-item>
            <b-dropdown-item @click="showModalShareHTML=true">{{$t('navbar.share.html.link')}}</b-dropdown-item>
          </b-nav-item-dropdown>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Download" right>
            <b-dropdown-item :href="model.exports.pdf">{{$t('navbar.exportAsPDF')}}</b-dropdown-item>
            <b-dropdown-item :href="model.exports.svg">{{$t('navbar.exportAsSVG')}}</b-dropdown-item>
            <b-dropdown-item :href="model.exports.png">{{$t('navbar.exportAsPNG')}}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-form>
            <b-btn  v-if="!model.authenticated" size="sm" variant="primary"  v-b-modal.modalLogin>
              {{$t('navbar.login')}}
            </b-btn>
            <b-btn  v-if="model.authenticated" size="sm" variant="primary"  @click="logout()">
              {{$t('navbar.logout')}}
            </b-btn>
          </b-nav-form>
        </b-navbar-nav>
      </template>
    </navbar>

    <modal-share-social v-model="showModalShareSocial" :model="model" :lang="lang" v-if="model"></modal-share-social>
    <modal-share-html v-model="showModalShareHTML" :model="model" :lang="lang" v-if="model"></modal-share-html>
    <modal-disconnected :visible="showModalDisconnected" :model="model" :lang="lang" v-if="model"></modal-disconnected>

    <b-modal id="modalLogin" ref="modalLogin" size="sm" :title="$t('navbar.authorization')" :ok-title="$t('navbar.login')" @ok="tryLogin" centered>
      <div class="container">
        <p v-if="inputSecretMsg" class="text-danger">{{inputSecretMsg}}</p>
        <b-form @submit.stop.prevent="login">
           <b-form-input id="inputToken" :state="inputSecretState" placeholder="Admin Token" v-model.trim="inputSecret"></b-form-input>
        </b-form>
      </div>
    </b-modal>

    <router-view :model="model" :secret="secret" :lang="lang"></router-view>
  </div>
</template>

<script>
import NavBar from '@/NavBar.vue'
import ModalShareSocial from "@/maps/modals/ModalShareSocial.vue"
import ModalShareHTML from "@/maps/modals/ModalShareHTML.vue"
import ModalDisconnected from "@/maps/modals/ModalDisconnected.vue"

import {MapModel} from 'aktionskarten.js'
import {api} from '@/api.js'

export default {
  name: 'app',
  components: {
    'navbar': NavBar,
    'modal-share-html': ModalShareHTML,
    'modal-share-social': ModalShareSocial,
    'modal-disconnected': ModalDisconnected,
  },
  props: ['lang'],
  data() {
    return {
      model: null,
      secret: null,
      inputSecretMsg: '',
      inputSecret: '',
      inputSecretState: null,
      showModalShareSocial: false,
      showModalShareHTML: false,
      showModalDisconnected: false,
    }
  },
  async mounted () {
    console.log("MapBase mounted");
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
  },
  methods: {
    async tryLogin(evt) {
      evt.preventDefault();
      if (await this.login(this.inputSecret)) {
        this.inputSecret = ''
        this.inputSecretState = null;
        this.inputSecretMsg = ''
        this.$refs.modalLogin.hide()
      } else {
        console.warn("login failed");
        this.inputSecretMsg = 'Invalid token. Login failed.'
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
          let params = {id: this.model.id, secret: secret, lang: this.lang};
          this.$router.replace({name: this.$route.name, params: params})
          return true;
        }
      }
      return false;
    },
    async fetchData () {
      let id = this.$route.params.id
      if (!id || (this.model && this.model.id == id)) {
        return;
      }

      // generic error handler
      api.errorHandler = (error) => {
        if (error == 'UNAUTHORIZED') {
          this.inputSecretMsg = 'Your token timed out.'
          this.inputSecret = this.secret;
          this.$refs.modalLogin.show()
        } else {
          this.$router.push({name: 'home', params: {lang: this.$route.params.lang}});
        }
      }

      this.model = await MapModel.get(api, id)

      this.model.on('disconnect', (e) => {
        this.showModalDisconnected = true;
      });

      this.model.on('connect', (e) => {
        this.showModalDisconnected = false;
      });

      this.model.on('idChanged', (e) => {
          console.log("idChanged", this.model.id)
          let params = Object.assign(this.$route.params, {id: this.model.id, lang: this.lang});
          this.$router.push({name: this.$route.name, params: params})
      });

      this.model.on('authenticated', (e) => {
        let authenticated = e.value
        if (!authenticated) {
          let params = Object.assign(this.$route.params, {id: this.model.id, lang: this.lang});
          this.$router.replace({name: this.$route.name, params: params})
        }
      });

      this.model.on('unauthorized', (e) => {
        this.$refs.modalLogin.show()
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
