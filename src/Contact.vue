<template>
  <div>
    <navbar :lang="lang"></navbar>
    <div class="container">
      <h3 class="mt-3">{{$t('contact.headline')}}</h3>
      <p>{{$t('contact.introduction')}}</p>
      <p>
        <a href="mailto:kontakt@aktionskarten.org">kontakt@aktionskarten.org</a>
      </p>
      <p v-html="$t('contact.preGPG', {gpgLink: ''})"></p>
      <pre>gpg --recv-keys 189D850A57D9A947</pre>
      <p v-html="$t('contact.postGPG')"></p>


      <h3 class="mt-3">{{$t('sources.headline')}}</h3>
      <p>
        {{$t('sources.description')}}
      </p>
      <ul>
        <li><a href="https://github.com/aktionskarten/frontend">aktionskarten/frontend</a></li>
        <li><a href="https://github.com/aktionskarten/aktionskarten.js">aktionskarten/aktionskarten.js</a></li>
        <li><a href="https://github.com/aktionskarten/backend">aktionskarten/backend</a></li>
        <li><a href="https://vuejs.org/">vuejs</a></li>
        <li><a href="https://leafletjs.com/">leaflet</a></li>
        <li><a href="https://mapnik.org/">mapnik</a></li>
      </ul>


      <h3 class="mt-3">{{$t('remark.headline')}}</h3>
      <p v-html="$t('remark.description')"> </p>
    </div>
  </div>
</template>

<script>

import NavBar from '@/NavBar.vue'

export default {
  name: 'home',
  components: {'navbar': NavBar},
  props: ['lang'],
}
</script>
