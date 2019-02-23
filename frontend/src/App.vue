<template>
  <v-app id="mainComponent" dark>

    <Header></Header>

    <Sidebar></Sidebar>

    <v-content>
      <v-layout>
        <router-view/>
      </v-layout>
    </v-content>
    
  </v-app>
</template>

<script>
import Header from "@/components/layout/Header.vue"
import Sidebar from '@/components/layout/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar
  }
}
</script>
