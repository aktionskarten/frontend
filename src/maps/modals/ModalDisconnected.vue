<template>
  <b-modal
      :visible="visible"
      :no-close-on-esc="true" :no-close-on-backdrop="true"
      body-bg-variant="danger" body-text-variant="light"
      size="md" hide-header hide-footer>
      Please check your internet connectivity. Trying to reconnect...
</b-modal>
</template>

<script>
export default {
  name: 'ModalDisconnect',
  props: ['visible'],
}
</script>

