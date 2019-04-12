<template>
	<div id="userProfile">
        <h1>EDIT</h1>
		{{ user.firstName }} <br>
        {{ user.lastName }} <br>
        {{ user.email }} <br>
        {{ user.about }} <br>
        {{ user.role.roleCaption }} <br>
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

        this.userId = this.$route.params.id

		axios
		.get('/api/user/' + this.userId)
		.then(res => {
			if(res.data.success == true){
				this.user = res.data.user
			}
		})
	}
};
</script>