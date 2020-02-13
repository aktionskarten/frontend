<template>
  <static-content :lang="lang" :files="files"></static-content>
</template>

<script>
import StaticContent from '@/static/Content.vue'
import contactEN from '@/static/contact_en.md'
import contactDE from '@/static/contact_de.md'

export default {
  name: 'Tutorial',
  props: ['lang'],
  components: {'static-content': StaticContent},
  data() { return { files: {en:contactEN, de:contactDE}} }
}
</script>
