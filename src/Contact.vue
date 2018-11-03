<template>
  <div>
    <navbar :lang="lang"></navbar>
    <div class="container">
      <h3 class="mt-3">{{$t('contact.headline')}}</h3>
      <p>
        {{$t('contact.introduction')}}
      </p>

      <p>
        <a href="mailto:kontakt@aktionskarten.org">kontakt@aktionskarten.org</a>
        [not active yet]
      </p>

      <p v-html="$t('contact.preGPG', {gpgLink: ''})"></p>

      <pre>gpg --recv-keys 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX</pre>

      <p v-html="$t('contact.postGPG')"></p>
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
