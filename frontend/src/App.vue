<template>
	<v-app id="mainComponent" dark>

		<MobileNav></MobileNav>

		<v-content>
			<v-layout id="mainLayout">
				<DesktopNav></DesktopNav>
				<router-view/>
			</v-layout>
		</v-content>
		
	</v-app>
</template>

<script>
import MobileNav from "@/components/layout/MobileNav.vue"
import DesktopNav from "@/components/layout/DesktopNav.vue"

export default {
	name: 'App',
	components: {
		MobileNav,
		DesktopNav
	},
	mounted() {
		this.$store.dispatch('authUser')
	}
}
</script>

<style>
#mainLayout{
	margin-top: 3em;
	width: 100%;
	height: 100%;
}

@media screen and (min-width: 960px) {
	#mainLayout{
		margin-top: 0;
	}
}
</style>
