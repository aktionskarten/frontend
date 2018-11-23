<template>
<div>
  <div class="container">
    <div class="my-2">
      <h2 class="text-center mt-4" v-if="isEditable">{{ $t(isNew ? 'form.createMap' : 'form.editMapTitle')}}</h2>
      <h2 class="text-center mt-4" v-else="isEditable">{{ $t('form.title')}}</h2>

      <navsteps :model="model" :secret="secret" :lang="lang"></navsteps>

      <b-form v-on:submit.prevent="onSubmit">
        <b-alert :show="invalidFeedback.general" dismissible fade variant="danger">{{invalidFeedback.general}}</b-alert>
        <b-alert :show="showAlert" @dismissed="showAlert=false"variant="success">{{$t('form.saved')}}</b-alert>
        <b-form-group
            :label="$t('form.name.label')"
            label-for="nameInput"
            :invalidFeedback="invalidFeedback.name"
            :state="invalidFeedback.name"
            :description="$t('form.name.description')"
            horizontal>
          <b-form-input id="nameInput" :placeholder="$t('form.name.placeholder')"
            v-model.trim="map.name" :state="(invalidFeedback.name != null) ? false : null"
            :plaintext="!isEditable"></b-form-input>
        </b-form-group>

        <b-form-group
            :label="$t('form.place.label')"
            label-for="placeInput"
            :description="$t('form.place.description')"
            horizontal>
          <b-form-input id="placeInput" :placeholder="$t('form.place.placeholder')"
            v-model.trim="map.place"
            :plaintext="!isEditable"></b-form-input>
        </b-form-group>

        <b-form-group :label="$t('form.mapExtract.label')" v-if="!isNew" horizontal>
          <b-form-input :value="map.bbox" plaintext></b-form-input>
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

          <dl class="mx-0 row" v-if="!isEditable" v-for="(val,i) in map.attributes" :key="val[0]+'-'+val[1]">
            <dt class="col-2 pl-0">{{val[0]}}</dt>
            <dd class="col-10">{{val[1]}}</dd>
          </dl>

          <b-list-group v-if="isEditable">
            <b-list-group-item v-for="(val,i) in map.attributes" :key="val[0]+'-'+val[1]"
              class="d-flex justify-content-between align-items-center">
              {{val[0]}} - {{val[1]}}
                <b-badge @click="removeAttribute(i)" variant="danger" >×</b-badge>
            </b-list-group-item>
            <b-list-group-item>
              <b-form v-on:submit.prevent>
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
              </b-form>
            </b-list-group-item>
          </b-list-group>
        </b-form-group>

        <div class="float-md-right" v-if="isEditable">
          <b-button :disabled="busy" v-if="!isNew" class="my-2" variant="danger" @click="showModalMapDelete = true">
            {{$t('form.deleteMap')}}
          </b-button>
          <b-button :disabled="busy" type="submit" variant="primary" class="my-2">
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
import NavSteps from '@/maps/NavSteps.vue'
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
    'navsteps': NavSteps,
    'modal-map-new': ModalMapNew,
    'modal-map-delete': ModalMapDelete
  },

  data () {
    return {
      busy: false,
      showAlert: false,
      showModalMapDelete: false,
      invalidFeedback: {name: null},
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

    async onSubmit() {
      if (this.busy) {
        console.warn("already busy");
        return;
      }
      try {
        this.busy = true;
        if (this.isNew) {
          let map = await api.createMap(this.map)
          if (!map) {
            throw {'general': 'Could not create map.'}
          }
          this.map = map;
        } else {
          let map = await this.model.save()
          if (!map) {
            throw {'general': 'Could not update map.'}
          }
          this.showAlert = 2
        }
      } catch (e) {
        for (let [k, v] of Object.entries(e)) {
          this.invalidFeedback[k] = this.$t(v, {keySeparator: null});
        }
        this.busy = false;
        window.scrollTo(0, 0)
        return;
      }

      // reset errors
      for (let k of Object.keys(this.invalidFeedback)) {
        this.invalidFeedback[k] = null;
      }

      this.busy = false;
      window.scrollTo(0, 0)
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
    bboxLink() {
      if (this.map && this.secret && this.lang) {
        let params = {name: 'map.bbox', params: {id: this.map.id, secret: this.secret, lang: this.lang}}
        return {name: 'map.bbox', params: params}
      }
    },
  }
}
</script>
