<template>
  <div id="app" class="h-100 w-100">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
html{
  height: 100%;
}

body {
  height: calc(100% - 60px);
}

.b-nav-dropdown{
 z-index: 9999
}
</style>
