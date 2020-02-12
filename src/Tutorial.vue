<template>
  <div>
    <navbar :lang="lang"></navbar>
    <div id="markdown" class="container" v-html="howTo"></div>
  </div>
</template>

<script>
import NavBar from '@/NavBar.vue'
import marked from 'marked'
import howToEn from '@/howto/en.md'
import howToDe from '@/howto/de.md'

export default {
  name: 'home',
  components: {'navbar': NavBar},
  props: ['lang'],
  computed: {
    howTo() {
      let howTos = {en:howToEn, de:howToDe};
      return marked(howTos[this.lang])
    }
  }
}
</script>

<style>
#markdown img {
  width: 30em;
  display: block;
  margin: 0 auto;
}
</style>
