<template>
	<div id="userProfile">
        <h1>EDIT</h1>
		{{ event.name }} <br>
   
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
        this.eventId = this.$route.params.id

		axios.get('/api/event/' + this.eventId)
		.then(res => {
			if(res.data.success == true){
				this.event = res.data.event
			}
        })
	}
};
</script>