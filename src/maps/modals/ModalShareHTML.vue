<template>
  <b-modal
      v-bind:visible="visible"
      v-on:change="$emit('change', $event)"
      size="lg" :title="$t('navbar.share.html.title')" @ok="$emit('ok')" hide-footer>
  <div class="container text-center">
    <div style="display: inline-block;">
      <div v-if="visible" v-html="iframe"></div>
      <b-form-textarea class="rounded-0 border-top-0" :rows="3" :value="iframe"></b-form-textarea>
    </div>
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
  methods: {
    foo(evt) {
      console.log(evt);
    }
  },
  computed: {
    iframe() {
      if (!this.model) {
        return;
      }
      let rel = {name: 'map.external', params: {id: this.model.id, lang: this.lang}}
      let src = this.$router.resolve(rel).href
      return '<iframe src="'+this.baseUrl+src+'" " marginheight="0" marginwidth="0" frameBorder="0" width="605" height="429"></iframe>'
    },
    baseUrl() {
      return window.location.href.split('#')[0]
    },
  }
}
</script>
