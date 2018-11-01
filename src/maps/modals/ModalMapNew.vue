<template>
<b-modal id="mapModal" :visible="true" size="lg" title="Karte erstellt" @ok="$emit('ok')" ok-title="Karte auswählen" ok-only>
  <div class="container">
    <p>
      Damit nur du und deine Freunde die Karte bearbeiten können gibt es
      einen speziellen <b>Admin-Link</b> für deine Aktionskarte. Speicher
      ihn dir gut ab, da du nur über diesen Link deine Karten verändern
      kannst:
    </p>


    <b-input-group prepend="Admin-Link">
      <b-form-input :value="adminLink"></b-form-input>
    </b-input-group>

    <p class="mt-4">
      Für alle anderen und die Öffentlichkeit verwende den
      <em>Public-Link</em>. Dieser ist nur zum Ansehen der Karte und lässt
      keine Bearbeitung zu:
    </p>

    <b-input-group prepend="Public-Link">
      <b-form-input :value="publicLink"></b-form-input>
    </b-input-group>
  </div>
</b-modal>
</template>

<script>
export default {
  name: 'navbar',
  props: ['map', 'secret'],
  computed: {
    adminLink () {
      if (this.map && this.secret) {
        let rel = {name: 'map', params: {id: this.map.id, secret: this.secret}}
        return window.location.href.split('#')[0] + this.$router.resolve(rel).href
      }
    },
    publicLink () {
      if (this.map && this.secret) {
        let rel = this.$router.resolve({name: 'map', params: {id: this.map.id}})
        return window.location.href.split('#')[0] + rel.href
      }
    },
  }
}
</script>
