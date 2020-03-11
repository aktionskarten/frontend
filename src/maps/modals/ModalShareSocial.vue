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
      if (!this.model) {
        return;
      }

      // check if img is available every second (it will be rendered
      // automatically if it's not yet rendered (in this case we a 202)
      let url = this.model.renderLink('png')
      fetch(url, {
        method: 'HEAD',
        headers: new Headers({Accept: "application/json"})
      }).then(response => {
        if (response.status == 200) {
          this.loaded = false;
          this.src = this.model.downloadLink('png')
        } else if (response.status == 202){
          setTimeout(()=>this.init(), 1000);
        } else {
          console.warn("not found");
        }
      });
    }
  },
  computed: {
    text() {
      if (!this.model) {
        return;
      }
      let params = {
        name: this.model.name,
        pdfLink: this.model.customLink('pdf'),
        pngLink: this.model.renderLink('png'),
        twitterLink: this.model.customLink('twitter')
      }
      return this.$t('preview.share.social.msg', params)
    },
  }
}
</script>
