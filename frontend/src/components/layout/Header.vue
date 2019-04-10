<template>
  <v-toolbar
    color="red"
    dense
    fixed
    clipped-left
    app
  >
    <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="toggleDrawer()"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-1 align-left">
      <span class="title">KUM</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Natjecanja</v-btn>
      <router-link tag="v-btn" to="/" flat>Home</router-link>
      <router-link tag="v-btn" to="/signup" flat>Prijavi se</router-link>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  methods: {
    toggleDrawer: function () {
      this.$store.state.navDrawer = !this.$store.state.navDrawer
    }
  },
  name: 'Header'
}
</script>