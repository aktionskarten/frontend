import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from "bootstrap-vue"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import App from './App.vue'
import Home from './Home.vue'
import NavBar from './NavBar.vue'
import MapBase from './maps/Base.vue'
import MapForm from './maps/Form.vue'
import MapLeaflet from './maps/Leaflet.vue'

Vue.use(Router)
Vue.use(BootstrapVue)

const router = new Router({
  routes: [
    { name: "home", path: '/', component: Home},
    { path: '/maps', component: MapBase,
      children: [
        { name: "map.new", path: 'new', component: MapForm},
        { name: "map.edit", path: ':id/edit/:secret?', component: MapForm},
        { name: "map.bbox", path: ':id/bbox/:secret', component: MapLeaflet},
        { name: "map", path: ':id/map/:secret?', component: MapLeaflet},
      ]
    }
  ]
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
