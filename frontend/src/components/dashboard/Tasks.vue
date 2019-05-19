<template>
	<div id="tasks">
        <v-container grid-list-xl>
            <v-layout row wrap v-if="users[0]">
                <v-flex xs12 sm6 lg4 v-for="(task, index) in tasks" :key="index">
                    <div class="task">
                       <v-card color="424242" class="white--text">
                            <v-card-title primary-title>
                                <v-layout row wrap>
                                    <v-flex xs10 sm9 md10 lg9 justify-end align-end>
                                        <span style="opacity: 0.5;">{{ task.createdAt | moment("from", "now") }}</span>
                                        <br>
                                        <div class="headline">{{ task.title }}</div></v-flex>
                                    <v-flex xs2 sm3 md2 lg3 align-self-start>
                                        <v-avatar size="2em" style="float: right;" class="tooltip">
                                            <img :src="returnAvatarByUserId(task.creatorId).avatar">
                                            <span class="tooltiptext">{{ returnAvatarByUserId(task.creatorId).firstName }} {{ returnAvatarByUserId(task.creatorId).lastName }}</span>
                                        </v-avatar>
                                    </v-flex>
                                    <v-flex sm12>{{ task.description }}</v-flex>
                                </v-layout>
                            </v-card-title>
                            <v-divider light></v-divider>
                            <v-card-actions>
                                <v-layout row wrap>
                                    <v-flex xs2>
                                        <span v-if="!task.assigned.users.includes($store.state.user._id)">
                                            <v-btn :disabled="task.assigned.users.length >= task.assigned.limit" @click="addMe(index)" class="hidden-sm-and-down" flat dark> Assign </v-btn>
                                            <v-btn :disabled="task.assigned.users.length >= task.assigned.limit" @click="addMe(index)" class="hidden-md-and-up" depressed icon dark small>
                                                <v-icon>add</v-icon>
                                            </v-btn>
                                        </span>
                                        <span v-else>
                                            <v-btn @click="removeMe(index)" class="hidden-sm-and-down" color="orange" flat dark> Unassign </v-btn>
                                            <v-btn @click="removeMe(index)" class="hidden-md-and-up" depressed icon dark small>
                                                <v-icon color="orange">remove</v-icon>
                                            </v-btn>
                                        </span>
                                    </v-flex>
                                    <v-flex xs10>
                                        <span class="task-chip-text">{{ task.assigned.users.length }} / {{ task.assigned.limit }}</span>
                                        <span class="task-chip-avatars" v-for="(userId, i) in task.assigned.users" :key="i">
                                            <v-avatar size="2em" class="tooltip" :style="{right: 15 * (task.assigned.users.length - i)  + 'px'}">
                                                <img :src="returnAvatarByUserId(userId).avatar">
                                                <span class="tooltiptext">{{ returnAvatarByUserId(userId).firstName }} {{ returnAvatarByUserId(userId).lastName }}</span>
                                            </v-avatar>
                                        </span>
                                    </v-flex>
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
            editPermission: false,
			tasks: [],
            users: []
		}
    },
	mounted() {
        this.checkPermission()
        this.$store.watch(() => this.$store.getters['checkAuth'], () => {
            this.checkPermission()
        })


        this.eventId = this.$route.params.id

		axios.get('/api/tasks')
		.then(res => {
			if(res.data.success == true){
				if(this.$store.state.userAuthenticated){
                    res.data.tasks.forEach(task => {
                        this.$store.dispatch('permissionAllowed', task.permissions).then(
                            perm => {
                                if(perm){
                                    this.tasks.push(task)
                                }
                            }
                        )
                    })
                }
			}
        })
        
        axios.get('/api/users')
		.then(res => {
			if(res.data.success == true){
				this.users = res.data.users
			}
		})
    },
    methods: {
        returnAvatarByUserId: function(userId) {
            for (let user of this.users) {
                if(user._id == userId){
                    let tempAvatar = ""

                    if (user.avatar.length == 12) { //default2.png - has 12 characters
                        tempAvatar = require("@/assets/img/avatars/" + user.avatar)
                    } else {
                        tempAvatar = user.avatar
                    }

                    return {
                        avatar: tempAvatar,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                }
            }
        },

        checkPermission: function() {
            if(this.$store.state.userAuthenticated){
                this.$store.dispatch('permissionAllowed', [0, 1, 2, 3]).then(
                    perm => {
                        this.editPermission = perm
                    }
                )
            }
        },

        addMe: function(i){
            this.tasks[i].assigned.users.push(this.$store.state.user._id)

            let temp = {
                _id: this.tasks[i]._id,
                assignedUsers: this.tasks[i].assigned.users
            }
            axios.post('/api/task/assign', temp)
        },
        removeMe: function(i){
            let index = this.tasks[i].assigned.users.indexOf(this.$store.state.user._id)
            if (index > -1) {
                this.tasks[i].assigned.users.splice(index, 1)
            }

            let temp = {
                _id: this.tasks[i]._id,
                assignedUsers: this.tasks[i].assigned.users
            }
            axios.post('/api/task/assign', temp)
        }
    },
};
</script>

<style>
#tasks{
    width: 100%;
}

.task{
    padding: 1.5em;
}
.task-chip-text{
    position: absolute;
    padding: 0.25em 1em 0.25em 2em;
    background-color: #303030;
    right: 1em;
    border-radius: 1em;
}

.task-chip-avatars{
    right: 1em;
    position: absolute;
    padding-right: 3em;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
