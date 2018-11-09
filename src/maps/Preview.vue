<template>
<div class="container h-100">
  <img v-if="src" v-on:load="loaded=true" v-show="loaded" :src="src" class="img-fluid my-5" alt="Preview">
  <div v-if="!loaded" class="container-spinner">
    <div class="spinner"> </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['model'],
  data() {
    return {
      loaded: false,
    }
  },
  watch: {
    src() {
      this.loaded = false;
    }
  },
  computed: {
    src () {
      if (this.model) {
        // svg seems too ressource intensive for clients
        return this.model.exports.png;
      }
    }
  },
}
</script>
