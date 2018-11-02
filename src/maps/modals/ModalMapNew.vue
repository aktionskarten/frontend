<template>
  <b-modal id="mapModal" :visible="true" size="lg" :title="'Karte '+this.map.name+' erstellt'" @ok="$emit('ok')" ok-title="Kartenausschnitt auswählen" ok-only>
  <div class="container">
    <p>
      Damit nur du und deine Freunde die Karte bearbeiten können gibt es ein
      zufallgeneriertes Passwort:
    </p>

    <pre class="text-center">{{secret}}</pre>

    <p>
      Nur wer im Besitz des Passworts ist kann die Karte bearbeiten. Deinen
      Mitstreiter*innen schickst du somit den kompletten Link. Dem Rest nur den
      den Teil ohne Passwort:
    </p>

    <b-input-group :prepend="publicLink">
      <b-form-input :value="secret"></b-form-input>
    </b-input-group>
  </div>
</b-modal>
</template>

<script>
export default {
  name: 'navbar',
  props: ['map', 'secret'],
  computed: {
    baseUrl() {
      return window.location.href.split('#')[0]
    },
    adminLink () {
      if (this.map && this.secret) {
        let rel = {name: 'map', params: {id: this.map.id, secret: this.secret}}
        return  this.$router.resolve(rel).href
      }
    },
    publicLink () {
      if (this.map && this.secret) {
        let rel = {name: 'map', params: {id: this.map.id}}
        return this.baseUrl + this.$router.resolve(rel).href + '/'
      }
    },
  }
}
</script>
