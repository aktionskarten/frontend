<template>
  <div class="container">
      <h2 class="text-center mt-4">{{ $t('preview.title')}}</h2>

      <navsteps :model="model" :secret="secret" :lang="lang"></navsteps>

      <p class="text-center my-0">{{ $t('preview.description')}}</p>

      <div class="text-center my-4">
        <b-dropdown :text="$t('preview.export.title')" class="m-md-2" variant="primary">
            <b-dropdown-item :href="model.exports.pdf">{{$t('preview.export.pdf')}}</b-dropdown-item>
            <b-dropdown-item :href="model.exports.svg">{{$t('preview.export.svg')}}</b-dropdown-item>
            <b-dropdown-item :href="model.exports.png">{{$t('preview.export.png')}}</b-dropdown-item>
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
}
</script>
