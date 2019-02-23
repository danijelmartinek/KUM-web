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
      <v-btn flat>Učitaj prijavu</v-btn>
      <v-btn flat>Prijavi se</v-btn>
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