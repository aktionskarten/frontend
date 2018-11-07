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
import Contact from './Contact.vue'
import Tutorial from './Tutorial.vue'
import NavBar from './NavBar.vue'
import MapBase from './maps/Base.vue'
import MapForm from './maps/Form.vue'
import MapLeaflet from './maps/Leaflet.vue'
import MapExternal from './maps/External.vue'

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
    { name: "home", path: '/:lang/home', component: Home, props: true},
    { name: "tutorial", path: '/:lang/tutorial', component: Tutorial, props: true},
    { name: "contact", path: '/:lang/contact', component: Contact, props: true},
    { path: '/:lang/maps', component: MapBase, props: true,
      children: [
        { name: "map.new", path: 'new', component: MapForm},
        { name: "map.edit", path: ':id/edit/:secret?', component: MapForm},
        { name: "map.bbox", path: ':id/bbox/:secret', component: MapLeaflet},
        { name: "map", path: ':id/map/:secret?', component: MapLeaflet},
      ]
    },
    { name: "map.external", path: '/:lang/maps/:id/external', component: MapExternal, props: true},
    { path: '*', redirect: '/de/home' }
  ]
})

// apply language for each route
router.beforeEach((to, from, next) => {
  // make body 100% height for external maps because they don't have a navbar
  // and scoped css does not apply for html or body tags
  if (to.name == 'map.external') {
    document.body.classList.add('h-100');
  } else {
    document.body.classList.remove('h-100');
  }
  i18next.changeLanguage(to.params.lang);
  next();
})

new Vue({
  el: '#app',
  router, i18n,
  template: '<App/>',
  components: { App }
})
