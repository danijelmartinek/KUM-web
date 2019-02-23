<template>
  <div>
    <mainSection></mainSection>
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
