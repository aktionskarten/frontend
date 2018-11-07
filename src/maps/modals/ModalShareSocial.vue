<template>
  <b-modal
      v-bind:visible="visible"
      v-on:change="$emit('change', $event)"
      size="md" :title="$t('navbar.share.social.title')" @ok="$emit('ok')" hide-footer>
  <div class="container">
    <p class="text-center">
      <b-img v-if="model " :src="model.exports.png + ':small'" class="w-100" alt="Responsive image" />
      <b-form-textarea class="m-auto rounded-0 border-top-0" :rows="8" :value="text"></b-form-textarea>
    </p>
  </div>
</b-modal>
</template>

<script>
export default {
  name: 'navbar',
  props: ['visible', 'model', 'lang'],
  model: {
    prop: 'visible',
    event: 'change'
  },
  computed: {
    text() {
      if (!this.model) {
        return;
      }
      let params = {
        name: this.model.name,
        date: this.model.date || 'unknown',
        place: this.model.place || 'unknown',
        linkPDF: this.model.exports.pdf,
      }
      return this.$t('navbar.share.social.msg', params)
    },
  }
}
</script>
