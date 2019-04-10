<template>
    <v-container align-center justify-center>
        <v-layout row wrap justify-center class="login-register">
			<v-flex xs12 sm10 md8 lg6>
				<v-tabs v-model="tabsModel" fixed-tabs>
					<v-tab
					v-for="tab in tabs"
					:key="tab.id"
					>
					{{ tab.tag }}
					</v-tab>
				</v-tabs>
				<v-divider></v-divider>
				<v-tabs-items v-model="tabsModel"  >
					<v-tab-item>
					<v-card flat>
						<login :lastRoute="lastRoute"></login>
					</v-card>
					</v-tab-item>
					<v-tab-item>
					<v-card flat>
						<register :lastRoute="lastRoute"></register>
					</v-card>
					</v-tab-item>
				</v-tabs-items>
			</v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import register from "@/components/signUp/Register.vue"
import login from "@/components/signUp/Login.vue"

export default {
  name: 'SignUpPage',
  data() {
		return {
			tabsModel: null,
			tabs: [
				{
					id: 1,
					tag: "Login"
				},
				{
					id: 2,
					tag: "Register"
				}
			],
			lastRoute: null
		}
	},
	mounted(){
		this.lastRoute = this.$store.state.lastRoute
		this.$store.state.lastRoute = null
	},
	components: {
		register,
		login
  }
}
</script>