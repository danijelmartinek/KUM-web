<template>
	<div id="tasks">
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex xs12 sm6 lg4 v-for="(task, index) in tasks" :key="index">
                    <div class="task">
                       <v-card color="blue darken-4" class="white--text">
                            <v-card-title primary-title>
                                <v-layout row wrap>
                                    <v-flex xs10 sm9 md10 lg9>
                                        <span style="opacity: 0.5;">{{ task.dateCreated }}</span>
                                        <br>
                                        <div class="headline">{{ task.title }}</div></v-flex>
                                    <v-flex xs2 sm3 md2 lg3>
                                        <v-avatar size="3.5em">
                                            <img :src="returnAvatarByUserId(task.creatorId)">
                                        </v-avatar>
                                    </v-flex>
                                    <v-flex sm12>{{ task.description }}</v-flex>
                                </v-layout>
                            </v-card-title>
                            <v-divider light></v-divider>
                            <v-card-actions>
                                <v-layout row wrap>
                                    <v-flex xs2>
                                        <span>
                                            <v-btn :disabled="task.assigned.assignedUsers.length >= task.assigned.limit" class="hidden-sm-and-down" flat dark>Prijavi se</v-btn>
                                            <v-btn :disabled="task.assigned.assignedUsers.length >= task.assigned.limit" class="hidden-md-and-up" depressed icon dark small>
                                                <v-icon>add</v-icon>
                                            </v-btn>
                                        </span>
                                    </v-flex>
                                    <v-flex xs10>
                                        <span class="task-chip-text">{{ task.assigned.assignedUsers.length }} / {{ task.assigned.limit }}</span>
                                        <span class="task-chip-avatars" v-for="(userId, i) in task.assigned.assignedUsers" :key="i">
                                            <v-avatar size="2em" :style="{right: 15 * (task.assigned.assignedUsers.length - i)  + 'px'}">
                                                <img :src="returnAvatarByUserId(userId)">
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
			tasks: [
                {
                    id: "432432",
                    title: "Volontiranje",
                    creatorId: "2232",
                    description: "U petak ESPR organizira dobrotvorni buvljak pa trebamo ljude.",
                    assigned: {
                        limit: 4,
                        assignedUsers: ["333","543", "432"]
                    },
                    dateCreated: "22.05.2019."
                }
            ],
            users: [
                {
                    id: "543",
                    avatar: "https://randomuser.me/api/portraits/men/15.jpg"
                },
                {
                    id: "333",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                    id: "2232",
                    avatar: "https://randomuser.me/api/portraits/men/54.jpg"
                },
                {
                    id: "432",
                    avatar: "https://randomuser.me/api/portraits/men/14.jpg"
                }
            ]
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
        returnAvatarByUserId: function(userId) {
            for (let user of this.users) {
                if(user.id == userId){
                    return user.avatar
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
    background-color: gray;
    right: 1em;
    border-radius: 1em;
}

.task-chip-avatars{
    right: 1em;
    position: absolute;
    padding-right: 3em;
}
</style>
