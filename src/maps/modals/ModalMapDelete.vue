<template>
  <b-modal
      ref="modal"
      v-bind:visible="visible"
      v-on:change="$emit('change', $event)"
      size="md" :cancel-title="$t('form.cancel')" footer-border-variant="light" hide-header hide-footer>
  <div class="container">
    <p class="row justify-content-center">
    {{$t('form.deleteText')}}
    </p>
    <div class="row justify-content-center">
        <b-button class="mx-1" @click="cancel()">
          {{$t('form.cancel')}}
        </b-button>
        <b-button variant="danger" class="mx-1" @click="onDelete()">
          {{$t('form.deleteMap')}}
        </b-button>
      </div>
  </div>
</b-modal>
</template>

<script>
export default {
  name: 'navbar',
  props: ['visible', 'model'],
  model: {
    prop: 'visible',
    event: 'change'
  },
  methods: {
    cancel () {
      this.$refs.modal.hide()
    },
    onDelete () {
      console.log(this.model);
      this.model.remove();
      this.$router.push({name: 'home', params: {lang: this.lang}})
    }
  }
}
</script>
