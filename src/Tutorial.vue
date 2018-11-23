<template>
  <div>
    <navbar :lang="lang"></navbar>
    <div class="container">
      <h3 class="mt-3">{{$t('tutorial.headline')}}</h3>
      <p>
        Not written yet.
      </p>
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
