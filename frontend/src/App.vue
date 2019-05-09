<template>
	<v-app id="mainComponent" dark>

		<Header></Header>

		<Sidebar></Sidebar>

		<v-content>
			<v-layout id="mainLayout">
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
	},
	mounted() {
		this.$store.dispatch('authUser')
	}
}
</script>

<style>
#mainLayout{
	width: 100%;
	height: 100%;
}
</style>
