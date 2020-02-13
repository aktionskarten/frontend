<template>
  <static-content :lang="lang" :files="files"></static-content>
</template>

<script>
import StaticContent from '@/static/Content.vue'
import howToEN from '@/static/howto_en.md'
import howToDE from '@/static/howto_de.md'

export default {
  name: 'Tutorial',
  props: ['lang'],
  components: {'static-content': StaticContent},
  data() { return { files: {en:howToEN, de:howToDE}} }
}
</script>
