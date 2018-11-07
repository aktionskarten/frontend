<template>
<div>
  <div class="container">
    <div class="my-2">
      <h2 v-if="isEditable">{{ $t(isNew ? 'form.createMap' : 'form.editMap')}}</h2>

      <b-form @submit="onSubmit">
        <b-alert :show="showSavedAlert" variant="success">Gespeichert</b-alert>
        <b-form-group
            :label="$t('form.name.label')"
            label-for="nameInput"
            :invalidFeedback="invalidMinLenFeedback(map.name)"
            :state="validate(map.name)"
            :description="$t('form.name.description')"
            horizontal>
          <b-form-input id="nameInput" :placeholder="$t('form.name.placeholder')"
            v-model.trim="map.name" :state="validate(map.name)"
            :plaintext="!isEditable"></b-form-input>
        </b-form-group>

        <b-form-group
            :label="$t('form.place.label')"
            label-for="placeInput"
            :invalidFeedback="invalidMinLenFeedback(map.place)"
            :state="validate(map.place)"
            :description="$t('form.name.description')"
            horizontal>
          <b-form-input id="placeInput" :placeholder="$t('form.place.placeholder')"
            v-model.trim="map.place" :state="validate(map.place)"
            :plaintext="!isEditable"></b-form-input>
        </b-form-group>

        <b-form-group :label="$t('form.mapExtract.label')" v-if="!isNew" horizontal>
          <b-form-row>
              <b-col v-if="map.bbox">
                <b-form-input :value="map.bbox" plaintext></b-form-input>
              </b-col>
              <b-col>
                <b-badge v-if="!isNew && isEditable" :to="bboxLink" >
                  {{$t('form.mapExtract.button')}}
                </b-badge>
              </b-col>
            </b-form-row>
        </b-form-group>

        <b-form-group
            :label="$t('form.date.label')"
            label-for="dateInput"
            :description="$t('form.date.description')"
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
            :label="$t('form.description.label')"
            label-for="descriptionTextarea"
            :description="$t('form.description.description')"
            horizontal>
          <b-form-textarea id="descriptionTextarea"
                           v-model="map.description"
                           :placeholder="$t('form.description.placeholder')"
                           :rows="5" :plaintext="!isEditable">
          </b-form-textarea>
        </b-form-group>

        <b-form-group
          :label="$t('form.legend.label')"
          label-for="attributesInput"
          :description="$t('form.legend.description')"
          horizontal>

          <dl class="mx-0 row" v-if="!isEditable" v-for="(val,i) in map.attributes" :key="val[0]-val[1]">
            <dt class="col-2 pl-0">{{val[0]}}</dt>
            <dd class="col-10">{{val[1]}}</dd>
          </dl>

          <b-list-group v-if="isEditable">
            <b-list-group-item v-for="(val,i) in map.attributes" :key="val[0]-val[1]"
              class="d-flex justify-content-between align-items-center">
              {{val[0]}} - {{val[1]}}
                <b-badge @click="removeAttribute(i)" variant="danger" >×</b-badge>
            </b-list-group-item>
            <b-list-group-item>
              <b-row class="my-1">
                <b-col>
                  <b-form-input size="sm" :placeholder="$t('form.legend.placeholderKey')" class="text-center" v-model="newAttribute.key"></b-form-input>
                </b-col>
                <b-col>
                  <b-form-input size="sm" :placeholder="$t('form.legend.placeholderValue')" class="text-center" v-model="newAttribute.value"></b-form-input>
                </b-col>
                <b-col class="d-flex align-items-center">
                  <b-button @click="addAttribute" size="sm">{{$t('form.legend.button')}}</b-button>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-form-group>

        <div class="float-md-right" v-if="isEditable">
          <b-button v-if="!isNew" class="my-2" variant="danger" @click="showModalMapDelete = true">
            {{$t('form.deleteMap')}}
          </b-button>
          <b-button :disabled="!isSubmitable" type="submit" variant="primary" class="my-2">
            {{$t(isNew ? 'form.createMap' : 'form.editMap')}}
          </b-button>
        </div>

        <modal-map-delete v-model="showModalMapDelete" :model="model" v-if="model"></modal-map-delete>
        <modal-map-new :map="map" :secret="secret" :lang="lang" v-if="isEditable && hasBbox" @ok="$router.push(bboxLink)"></modal-map-new>
      </b-form>
    </div>
  </div>
</div>
</template>

<script>
import ModalMapNew from "@/maps/modals/ModalMapNew.vue"
import ModalMapDelete from "@/maps/modals/ModalMapDelete.vue"
import {MapModel} from 'aktionskarten.js'
import {api} from '@/api.js'

let mapDefaults = {
  date: new Date().toISOString().slice(0, 10),
  time: '14:00',
  attributes: []
}

export default {
  props: ['model', 'secret', 'lang'],
  components: {
    'modal-map-new': ModalMapNew,
    'modal-map-delete': ModalMapDelete
  },

  data () {
    return {
      showSavedAlert: false,
      showModalMapDelete: false,
      map: mapDefaults,
      newAttribute: {key: '', value: ''}
    }
  },

  watch: {
    model: 'init'
  },

  mounted () {
    console.log("MapForm mounted");
    this.init();
  },

  methods: {
    init() {
      if (this.model) {
        this.map = this.model.data
        this.updateRoute();
      }
    },

    updateRoute() {
      if (!this.map.id) {
        console.warn("can't updateRoute without valid id");
        return;
      }

      let params = {
        id: this.map.id,
        secret: this.secret || this.map.secret,
        lang: this.lang
      };
      this.$router.push({name: 'map.edit', params: params})
    },

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
      old.splice(i, 1)
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
        let map = await api.createMap(this.map)
        if (!map) {
          console.warn("could not save");
          return;
        }
        this.map = map;
      } else {
        if (!(await this.model.save())) {
          console.warn("could not save");
          return;
        }
        this.showSavedAlert = true
      }

      this.updateRoute();
    }
  },
  computed: {
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
      return this.validName == null
    },
    bboxLink() {
      if (this.map && this.secret && this.lang) {
        let params = {name: 'map.bbox', params: {id: this.map.id, secret: this.secret, lang: this.lang}}
        return {name: 'map.bbox', params: params}
      }
    },
  }
}
</script>
