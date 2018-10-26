<template>
<div>
  <div class="container">
    <div class="my-2">
      <h2 v-if="isEditable">{{ isNew ? 'Neue Aktionskarte erstellen' : 'Karte bearbeiten'}}</h2>

      <b-form @submit="onSubmit">
        <b-alert :show="showSavedAlert" variant="success">Gespeichert</b-alert>
        <b-form-group
            label="Name"
            label-for="nameInput"
            :invalidFeedback="invalidMinLenFeedback(map.name)"
            :state="validate(map.name)"
            horizontal>
          <b-form-input id="nameInput" placeholder="Name deiner Karte"
            v-model.trim="map.name" :state="validate(map.name)"
            :plaintext="!isEditable"></b-form-input>
        </b-form-group>

        <b-form-group
            label="Ort"
            label-for="placeInput"
            :invalidFeedback="invalidMinLenFeedback(map.place)"
            :state="validate(map.place)"
            horizontal>
          <b-form-input id="placeInput" placeholder="Ort wo deine Aktion ist"
            v-model.trim="map.place" :state="validate(map.place)"
            :plaintext="!isEditable"></b-form-input>
          <b-form-input v-if="map.bbox" :value="map.bbox" plaintext></b-form-input>
          <b-badge v-if="!isNew && isEditable" :to="bboxLink" >Kartenausschnitt ändern</b-badge>
        </b-form-group>

        <b-form-group
            label="Datum"
            label-for="dateInput"
            horizontal>
          <b-row class="my-1">
            <b-col sm="3">
              <b-form-input class="text-left" id="dateInput" type="date" v-model="map.date" :plaintext="!isEditable"></b-form-input>
            </b-col>
            <b-col sm="2">
              <b-form-input class="text-left" id="timeInput" type="time" v-model="map.time" :plaintext="!isEditable"></b-form-input>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group
            label="Beschreibung"
            label-for="descriptionTextarea"
            horizontal>
          <b-form-textarea id="descriptionTextarea"
                           v-model="map.description"
                           placeholder="Beschreibung deiner Aktion"
                           :rows="5" :plaintext="!isEditable">
          </b-form-textarea>
        </b-form-group>

        <b-form-group
            label="Legende"
            label-for="attributesInput"
            horizontal>

          <b-container>
            <b-row>
              <b-col cols="6" v-if="!isEditable">
                <dl class="row" v-for="(val,i) in map.attributes">
                  <dt class="col-4 pl-0">{{val[0]}}</dt>
                  <dd class="col-8">{{val[1]}}</dd>
                </dl>
              </b-col>

              <b-col cols="6" class="px-0" v-if="isEditable">
                <b-list-group>
                  <b-list-group-item v-for="(val,i) in map.attributes"
                    class="d-flex justify-content-between align-items-center">
                    {{val[0]}} - {{val[1]}}
                      <b-badge @click="removeAttribute(i)" variant="danger" >×</b-badge>
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-row class="my-1">
                      <b-col>
                        <b-form-input size="sm" placeholder="Schlüssel" class="text-center" v-model="newAttribute.key"></b-form-input>
                      </b-col>
                      <b-col>
                        <b-form-input size="sm" placeholder="Wert" class="text-center" v-model="newAttribute.value"></b-form-input>
                      </b-col>
                      <b-col class="d-flex align-items-center">
                        <b-button @click="addAttribute" size="sm">Hinzufügen</b-button>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col align-self="center" v-if="isEditable">
                <p class="ml-3 text-right text-muted">
                  Hier gespeichert Schlüssel-Werte-Paare sollen dir ermöglichen
                  wichtige Informationen zu hinterlegen. Beispiele sind
                  <i>Twitter-@account</i>, <i>EA-0891234</i> oder
                  <i>Hashtag-#B0803</i>. Diese werden dann auf deiner
                  Aktionskarte hinterlegt.
                </p>
              </b-col>
            </b-row>
          </b-container>
        </b-form-group>

        <b-button v-if="isEditable" :disabled="!isSubmitable" class="float-right mb-5" type="submit" variant="primary"> {{ this.isNew ? 'Karte erstellen' : 'Aktualisieren' }}</b-button>

        <b-modal id="mapModal" v-model="hasBbox" size="lg" title="Karte erstellt" ok-title="Karte auswählen" @ok="$router.push(bboxLink)" ok-only>
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
      </b-form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['api', 'model', 'secret'],
  data () {
    return {
      showSavedAlert: false,
      map: {
        date: new Date().toISOString().slice(0, 10),
        time: '14:00',
        attributes: []
      },
      newAttribute: {key: '', value: ''}
    }
  },
  watch: {
    model () {
      if (this.model.data) {
        this.map = this.model.data
      }
    }
  },
  methods: {
    addAttribute() {
      if (!this.newAttribute.key || !this.newAttribute.value) {
        console.warn("Can't add empty attributes");
        return;
      }
      let old = this.map.attributes,
          tmp = (old && old.length) ? old.slice() : []
      tmp.push([this.newAttribute.key, this.newAttribute.value])
      this.map.attributes = tmp;
      this.newAttribute.key = this.newAttribute.value = ''
    },
    removeAttribute(i) {
      let old = this.model.attributes.slice()
      console.log("remove-before", old)
      old.splice(i, 1)
      console.log("remove-after", old)
      this.model.attributes = old
    },
    validate (value) {
      var len = value && value.length;
      return !len || len >= 4 ? null : false
    },
    invalidMinLenFeedback (value) {
      return this.validate(value) ? '' : "Bitte mindestens 4 Buchstaben eingeben"
    },
    async onSubmit() {
      if (this.isNew) {
        let model = await this.api.createMap(this.map)
        this.$router.push({name: 'map.edit', params: {id: model.id, secret: model.secret}})
      } else {
        console.log("pre-save", this.map);
        this.model.save()
        this.showSavedAlert = true
        this.$router.replace({name: 'map.edit', params: {id: this.map.id, secret: this.secret}})
      }
    },
  },
  computed: {
    adminLink () {
      let rel = {name: 'map.edit', params: {id: this.map.id, secret: this.secret}}
      return window.location.href.split('#')[0] + this.$router.resolve(rel).href
    },
    publicLink () {
      let rel = this.$router.resolve({name: 'map', params: {id: this.map.id}})
      return window.location.href.split('#')[0] + rel.href
    },
    bboxLink() {
      let params = {name: 'map.bbox', params: {id: this.map.id, secret: this.secret}}
      return {name: 'map.bbox', params: params}
    },
    isEditable () {
      return this.isNew || (this.model && this.model.authenticated)
    },
    isNew () {
      return !this.map || !this.map.id
    },
    hasBbox () {
      return !this.isNew && !this.map.bbox
    },
    isSubmitable () {
      return true //this.validName == null
    },
  }
}
</script>
