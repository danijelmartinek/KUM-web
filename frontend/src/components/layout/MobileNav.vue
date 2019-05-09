<template>
  <v-toolbar
    class="hidden-md-and-up"
    color="#0c0e1c"
    fixed
    flat
    clipped-right
  >
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="toggleDrawer()"></v-toolbar-side-icon>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card color="#0c0e1c">
        <v-toolbar 
          class="hidden-md-and-up"
          color="#0c0e1c"
          flat
          clipped-right
        >
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    toggleDrawer: function () {
      this.dialog = true
    }
  },
  name: 'MobileNav'
}
</script>