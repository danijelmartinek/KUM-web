<template>
	<div>
		<h1 v-if="permission">Dashboard - user data</h1>
		<p>
			<v-img class="bg" src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
			<button @click="logout()">Odjavi</button>
		</p>   
	</div>
</template>

<script>
export default {
	name: 'dashboard',
	data() {
		return {
			permission: true, 
		}
	},
	mounted() {
		this.$store.dispatch('permissionAllowed', [0, 1, 2, 3]).then(
			perm => {
				this.permission = perm
				return this.permission
			}
		)
	},
	methods: {
		logout: function(){
			this.$store.commit('logoutUser')
		}
	}
}
</script>