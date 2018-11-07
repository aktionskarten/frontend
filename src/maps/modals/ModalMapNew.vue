<template>
  <b-modal :visible="true" size="lg" :title="$t('form.modal.title', {name:this.map.name})" @ok="$emit('ok')" :ok-title="$t('form.modal.button')" ok-only>
  <div class="container">
    <p>
      {{$t('form.modal.preText')}}
    </p>

    <pre class="text-center">{{secret}}</pre>

    <p>
      {{$t('form.modal.postText')}}
    </p>

    <p>
      <b-input-group :prepend="publicLink">
        <b-form-input :value="secret"></b-form-input>
      </b-input-group>
    </p>

    <p>
      {{$t('form.modal.footer')}}
    </p>
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
        return  this.$router.resolve(rel).href
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
