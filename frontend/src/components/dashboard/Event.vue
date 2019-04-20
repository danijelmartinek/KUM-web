<template>
	<div id="userProfile">
		{{ event.name }} <br>
        <router-link v-if="editPermission" tag="div" :to="'/dashboard/event/' + eventId + '/edit'">
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
            eventId: null,
			event: {
                name: ''
            }
		}
    },
	mounted() {
        this.checkPermission()
        this.$store.watch(() => this.$store.getters['checkAuth'], () => {
            this.checkPermission()
        })


        this.eventId = this.$route.params.id

		axios.get('/api/event/' + this.eventId)
		.then(res => {
			if(res.data.success == true){
				this.event = res.data.event
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