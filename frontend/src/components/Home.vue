<template>
  <div>
    <mainSection></mainSection>
    <div style="height: 2000px;"></div>
    <secondSection></secondSection>
  </div>
</template>

<script>
import mainSection from "@/components/homePage/MainSection.vue"
import secondSection from "@/components/homePage/SecondSection.vue"

export default {
  name: 'SignUpPage',
  components: {
    mainSection,
    secondSection
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

@import url('https://fonts.googleapis.com/css?family=Halant');
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans');
</style>

