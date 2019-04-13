<template>
	<div id="userProfile">
		{{ user.firstName }} <br>
        {{ user.lastName }} <br>
        {{ user.email }} <br>
        {{ user.about }} <br>
        {{ user.role.roleCaption }} <br>
        <router-link v-if="editPermission" tag="div" :to="'/dashboard/user/' + userId + '/edit'">
            <a>edit</a>
        </router-link>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
            editPermission: false,
            userId: null,
			user: {
                firstName: '',
                lastName: '',
                email: '',
                about: '',
                role: {
                    roleCaption: ''
                }
            }   
		}
    },
	mounted() {
        this.checkPermission()
        this.$store.watch(() => this.$store.getters['checkAuth'], () => {
            this.checkPermission()
        })


        this.userId = this.$route.params.id

		axios.get('/api/user/' + this.userId)
		.then(res => {
			if(res.data.success == true){
				this.user = res.data.user
			}
		})
    },
    methods: {
        checkPermission: function() {
            if(this.$store.state.userAuthenticated){
                this.$store.dispatch('permissionAllowed', [0, 1, 2, 3]).then(
                    perm => {
                        this.editPermission = perm
                    }
                )
            }
        }
    },
};
</script>