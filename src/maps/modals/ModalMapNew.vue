<template>
  <b-modal :visible="true" size="lg" :title="$t('form.modal.title', {name:this.map.name})" @ok="$emit('ok')" :ok-title="$t('form.modal.button')" ok-only>
  <div class="container">
    <p>
      {{$t('form.modal.introduction')}}
    </p>

    <pre class="text-center">{{secret}}</pre>

    <p class="text-center my-4">
      {{$t('form.modal.adminLinkText')}}
    </p>

    <b-form-group
        :label="$t('form.modal.adminLink')" label-text-align="center"
        label-for="adminLink" label-class="modal-new-label"
        horizontal>
      <b-form-input id="adminLink" :value="adminLink"></b-form-input>
    </b-form-group>

    <p class="text-center mt-5 mb-4">
      {{$t('form.modal.publicLinkText')}}
    </p>

    <b-form-group
        :label="$t('form.modal.publicLink')" label-text-align="center"
        label-for="adminLink" label-class="modal-new-label"
        horizontal>
      <b-form-input id="adminLink" :value="publicLink"></b-form-input>
    </b-form-group>

  </div>
</b-modal>
</template>

<script>
export default {
  name: 'navbar',
  props: ['map', 'secret', 'lang'],
  computed: {
    baseUrl() {
      return window.location.href.split('#')[0]
    },
    adminLink () {
      if (this.map && this.secret) {
        let rel = {name: 'map', params: {id: this.map.id, secret: this.secret, lang: this.lang}}
        return this.baseUrl + this.$router.resolve(rel).href
      }
    },
    publicLink () {
      if (this.map && this.secret) {
        let rel = {name: 'map', params: {id: this.map.id, lang: this.lang}}
        return this.baseUrl + this.$router.resolve(rel).href + '/'
      }
    },
  }
}
</script>


<style>
.modal-new-label {
  font-weight: bold;
}
</style>
