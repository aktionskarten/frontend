<template>
  <div class="container">
      <h2 class="text-center mt-4">{{ $t('preview.title')}}</h2>

      <navsteps v-if="model" :model="model" :secret="secret" :lang="lang"></navsteps>

      <p class="text-center my-0">{{ $t('preview.description')}}</p>

      <div class="text-center my-4">
        <b-dropdown :text="$t('preview.export.title')" class="m-md-2" variant="primary">
            <b-dropdown-item :href="urls.pdf">{{$t('preview.export.pdf')}}</b-dropdown-item>
            <b-dropdown-item :href="urls.svg">{{$t('preview.export.svg')}}</b-dropdown-item>
            <b-dropdown-item :href="urls.png">{{$t('preview.export.png')}}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown :text="$t('preview.share.title')" class="m-md-2" variant="primary">
            <b-dropdown-item @click="showModalShareSocial=true">{{$t('preview.share.social.link')}}</b-dropdown-item>
            <b-dropdown-item @click="showModalShareHTML=true">{{$t('preview.share.html.link')}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-dropdown>
      </div>

      <modal-share-social v-model="showModalShareSocial" :model="model" :lang="lang" v-if="model"></modal-share-social>
      <modal-share-html v-model="showModalShareHTML" :model="model" :lang="lang" v-if="model"></modal-share-html>

      <div class="my-5">
        <img v-if="src" v-on:load="loaded=true" v-show="loaded" :src="src" class="img-fluid" alt="Preview">
        <div v-if="!loaded" class="container-spinner py-5">
          <div class="spinner"> </div>
          <p class="text-center mt-4">
          {{$t('preview.generating')}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavSteps from '@/maps/NavSteps.vue'
import ModalShareSocial from "@/maps/modals/ModalShareSocial.vue"
import ModalShareHTML from "@/maps/modals/ModalShareHTML.vue"

export default {
  props: ['model', 'secret', 'lang'],
  components: {
    'navsteps': NavSteps,
    'modal-share-html': ModalShareHTML,
    'modal-share-social': ModalShareSocial,
  },
  data() {
    return {
      loaded: false,
      showModalShareSocial: false,
      showModalShareHTML: false,
      src: null,
      urls: {
        'pdf': null,
        'svg': null,
        'png': null
      }

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
      if (!this.model) {
        return;
      }

      this.urls.png = this.model.downloadLink('png')
      this.urls.pdf = this.model.downloadLink('pdf')
      this.urls.svg = this.model.downloadLink('svg')

      // check if img is available every second (it will be rendered
      // automatically if it's not yet rendered (in this case we a 202)
      let url = this.model.renderLink('png')
      fetch(url, {
        method: 'HEAD',
        headers: new Headers({Accept: "application/json"})
      }).then(response => {
        if (response.status == 200) {
          this.loaded = false;
          this.src = this.urls.png
        } else if (response.status == 202){
          setTimeout(()=>this.init(), 1000);
        } else {
          console.warn("not found");
        }
      });
    }
  },
}
</script>
