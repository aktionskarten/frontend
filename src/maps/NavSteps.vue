<template>
  <div class="d-none d-lg-block container-fluid pt-5" v-bind:class="{ 'stepper-map-container': absolute, 'pb-5': !absolute, 'pb-2': absolute}">
  <div class="container navsteps">
    <div class="row">
      <h5 class="col-12 col-lg-auto mb-0">
        <b-link :to="model && {name: 'map.edit', params: {id: model.id, secret: secret}}" v-bind:class="{active: ['map.new', 'map.edit'].indexOf($route.name) != -1}">
          <span class="badge mx-2" v-bind:class="[['map.new', 'map.edit'].indexOf($route.name) != -1 ? 'badge-primary' : 'badge-secondary']"></span>
          {{$t('navsteps.form')}}
        </b-link>
      </h5>
      <div class="col d-none d-lg-block" v-if="model.authenticated"><hr></div>
      <h5 class="col-12 col-lg-auto mb-0" v-if="model.authenticated">
        <b-link :to="model && {name: 'map.bbox', params: {id: model.id, secret: secret, lang: lang}}" :disabled="!model || !model.bbox">
          <span class="badge mx-2" v-bind:class="[$route.name == 'map.bbox' ? 'badge-primary' : 'badge-secondary']"></span>
          {{$t('navsteps.bbox')}}
        </b-link>
      </h5>
      <div class="col d-none d-lg-block"><hr></div>
      <h5 class="col-12 col-lg-auto mb-0">
        <b-link id="popoverMap" :to="model && {name: 'map', params: {id: model.id, secret: secret, lang: lang}}" :disabled="!model || !model.bbox">
          <span class="badge mx-2" v-bind:class="[$route.name == 'map' ? 'badge-primary' : 'badge-secondary']"></span>
          {{$t('navsteps.map.' + (model.authenticated ? 'edit' : 'static') )}}
          <b-popover :show="$route.name == 'map' && model.authenticated"  ref="popover" target="popoverMap" placement="top" class="align-center">
            <b-btn @click="$refs.popover.$emit('close')" class="close" aria-label="Close">
              <span class="d-inline-block" aria-hidden="true">&times;</span>
            </b-btn>
            {{$t('navsteps.map.introduction')}}
          </b-popover>
        </b-link>
      </h5>
      <div class="col d-none d-lg-block"><hr></div>
      <h5 class="col-12 col-lg-auto mb-0">
        <b-link :to="model && {name: 'map.preview', params: {id: model.id, secret: secret, lang: lang}}" :disabled="!model || !model.bbox">
          <span class="badge mx-2" v-bind:class="[$route.name == 'map.preview' ? 'badge-primary' : 'badge-secondary']"> </span>
          {{$t('navsteps.preview')}}
        </b-link>
      </h5>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'navsteps',
  props: ['model', 'secret', 'lang', 'absolute'],
}
</script>

<style>
.stepper-map-container {
  position: absolute;
  z-index: 999;
  bottom: 0;
  background-image: linear-gradient(0deg, rgba(255,255,255,1) 0, rgba(255,255,255,.8) 50%, rgba(255,255,255,0) 100%);
}

.navsteps h5 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navsteps a {
  color: black;
}

.navsteps a:not(.active) {
  font-size: 1rem;
}

.navsteps a.active {
  font-style: italic;
}

.navsteps a.disabled {
  color: grey;
}

.navsteps {
  counter-reset: section;
}

.navsteps span.badge:empty{
  display: inline-block !important;
}
.navsteps span.badge::before {
  counter-increment: section;
  content: counter(section);
}
</style>
