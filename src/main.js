import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from "bootstrap-vue"

import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import locales from './i18n'

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
Vue.use(VueI18Next);

i18next.init({
  fallbackLng: 'en',
  resources: locales,
  debug: true
});
const i18n = new VueI18Next(i18next);

const router = new Router({
  routes: [
    { name: "home", path: '/:lang', component: Home, props: true},
    { path: '/:lang/maps', component: MapBase, props: true,
      children: [
        { name: "map.new", path: 'new', component: MapForm},
        { name: "map.edit", path: ':id/edit/:secret?', component: MapForm},
        { name: "map.bbox", path: ':id/bbox/:secret', component: MapLeaflet},
        { name: "map", path: ':id/map/:secret?', component: MapLeaflet},
      ]
    },
    { path: '*', redirect: '/de' }
  ]
})

// apply language for each route
router.beforeEach((to, from, next) => {
  i18next.changeLanguage(to.params.lang);
  next();
})

new Vue({
  el: '#app',
  router, i18n,
  template: '<App/>',
  components: { App }
})
