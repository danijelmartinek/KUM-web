<template>
  <div>
    <h1>Dashboard - user data</h1>
    <p>
      <v-img class="bg" src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
    </p>   
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  mounted(){
    this.$store.commit('authUser')
  }
}
</script>