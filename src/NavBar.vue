<template>
<b-navbar toggleable="md" type="dark" variant="dark">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <router-link :to="{name: 'home'}">
    <b-navbar-brand class="d-flex align-items-center">
       <img src="@/assets/logo.svg" alt="Logo" class="mr-2">
       <slot name="name">Aktionskarten</slot>
    </b-navbar-brand>
  </router-link>

  <b-collapse is-nav id="nav_collapse">
    <slot>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <router-link :to="{name: 'map.new'}">
            <b-button size="sm" variant="secondary">
              neue Karte erstellen
            </b-button>
          </router-link>
        </b-nav-form>
      </b-navbar-nav>
    </slot>
  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: 'navbar',
}
</script>
