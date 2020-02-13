<template>
  <div>
    <navbar :lang="lang"></navbar>
    <div id="markdown" class="container" v-html="content"></div>
  </div>
</template>

<script>
import NavBar from '@/NavBar.vue'

export default {
  name: 'static-content',
  props: ['lang', 'files'],
  components: {'navbar': NavBar},
  computed: {
    content() {
      return this.files[this.lang]
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
