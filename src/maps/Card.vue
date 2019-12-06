<template>
  <b-link class="col-12 col-md-4 my-2" :to="{name:'map', params: {id: entry.id}}">
    <b-card align="center" no-body>
        <b-card-img v-if="thumbnail" v-show="loaded" v-on:load="loaded=true" :src="thumbnail" :alt="entry.datetime + '@' + entry.place" top></b-card-img>

        <div v-if="!loaded" class="container-spinner mt-3 py-5">
            <div class="spinner"> </div>
        </div>

        <b-card-body class="pt-2" :title="entry.name" :sub-title="date">{{entry.place}}</b-card-body>
    </b-card>
  </b-link>
</template>

<script>
export default {
  name: 'card',
  props: ['entry'],
  data() {
    return {
      loaded: false,
      thumbnail: null
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    date() {
      if (this.entry) {
        if (this.entry.datetime) {
          return this.entry.datetime.toLocaleDateString()
        }
      }
    },
  },
  methods: {
    init() {
      if (!this.entry) {
        return;
      }

      // check if img is available every second
      let url = this.entry.renderLink('png:small')
      fetch(url, {
        method: 'HEAD',
        headers: new Headers({Accept: "application/json"})
      }).then(response => {
        if (response.status == 200) {
          this.loaded = false;
          this.thumbnail = this.entry.downloadLink('png:small')
        } else if (response.status == 202){
          setTimeout(()=>this.init(), 1000);
        } else {
          console.warn("not found");
        }
      });
    }
  },
}
</script>
