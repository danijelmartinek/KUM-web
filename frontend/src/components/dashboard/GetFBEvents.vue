<template>
    <div id="get-fb-events">
        <v-btn v-if="auth" href="/api/fb/auth" color="default darken-3">
            Spoji se na Facebook
        </v-btn>
        <v-btn v-if="getEvents" @click="FBgetEvents" color="orange">
            Preuzmi događaje
        </v-btn>
        <v-progress-circular
        v-if="getEventsProgress"
        indeterminate
        color="amber"
        ></v-progress-circular>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
		return {
            auth: true,
            getEvents: false,
            getEventsProgress: false
        }
    },
    mounted(){
        if(this.$route.query.fbauth === 'true'){
            this.auth = false
            this.getEvents = true
        }
    },
    methods: {
        FBgetEvents() {
            this.getEvents = false
            this.getEventsProgress = true
            
            axios.get('/api/fb/events/get', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
            .then(res => {
                if(res.data.success == true){
                    this.getEventsProgress = false

                    this.$emit('updateEvents');
                }
            })
        }
    }
}
</script>

<style>
#get-fb-events{
    float: right;
}
</style>
