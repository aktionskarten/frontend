<template>
  <b-modal
      v-bind:visible="visible"
      v-on:change="$emit('change', $event)"
      size="md" :title="$t('preview.share.social.title')" @ok="$emit('ok')" hide-footer>
  <div class="container">
      <img v-if="src" v-on:load="loaded=true" v-show="loaded" :src="src" class="img-fluid" alt="Preview">
      <div v-if="!loaded" class="container-spinner py-5 border-top border-left border-right">
        <div class="spinner"> </div>
        <p class="text-center mt-4">
        {{$t('preview.generating')}}
        </p>
      </div>
      <b-form-textarea class="m-auto rounded-0 border-top-0" :rows="4" :value="text"></b-form-textarea>
  </div>
</b-modal>
</template>

<script>
export default {
  name: 'ModalShareSocial',
  props: ['visible', 'model', 'lang'],
  model: {
    prop: 'visible',
    event: 'change'
  },
  data() {
    return {
      loaded: false,
      showModalShareSocial: false,
      showModalShareHTML: false,
      src: null
    }
  },
  watch: {
    'model': 'init'
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    console.log("init", this.model)
      if (!this.model || !this.model.exports) {
        return;
      }

      // svg seems too ressource intensive for clients
      this.loaded = false;
      this.src = this.model.exports.png + '?' + this.model.data.hash
    }
  },
  computed: {
    text() {
      if (!this.model || !this.model.exports) {
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
