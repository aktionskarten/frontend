<template>
<b-navbar toggleable="md" type="dark" variant="dark">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <router-link :to="{name: 'home', params: {lang: $route.params.lang}}">
    <b-navbar-brand class="d-flex align-items-center">
       <img src="@/assets/logo.svg" alt="Logo" class="mr-2">
       <slot name="name">Aktionskarten</slot>
    </b-navbar-brand>
  </router-link>

  <b-collapse is-nav id="nav_collapse">
    <slot>
    </slot>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown :text="lang ? lang : 'en'" right>
        <b-dropdown-item :to="{name: $route.name, params: Object.assign({}, $route.params, {lang: 'en'})}">EN</b-dropdown-item>
        <b-dropdown-item :to="{name: $route.name, params: Object.assign({}, $route.params, {lang: 'de'})}">DE</b-dropdown-item>
      </b-nav-item-dropdown>

      <slot name="navbar">
      <b-nav-form v-if="$route.name != 'map.new'">
        <router-link :to="{name: 'map.new'}">
          <b-button variant="primary">
            {{$t("navbar.newMap")}}
          </b-button>
        </router-link>
      </b-nav-form>
      </slot>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  props: ['lang']
}
</script>
