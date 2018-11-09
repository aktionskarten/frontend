<template>
  <div class="container">
    <img v-if="src" :src="src" class="img-fluid my-5" alt="Preview">
  </div>
</template>

<script>
export default {
  props: ['model'],
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
