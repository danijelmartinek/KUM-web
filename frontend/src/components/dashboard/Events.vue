<template>
	<div id="eventTable" style="width: 100%;">
		<v-container grid-list-xl fluid>
			<v-layout row wrap>
				<v-flex sm10>
					<h3>Događaji</h3>
				</v-flex>
				<v-flex sm2>
					<getFBEvents @updateEvents="updateEvents"></getFBEvents>
				</v-flex>      
				<v-flex lg12>
					<v-card>
						<v-toolbar card color="gray">
							<v-text-field
							flat
							solo
							prepend-icon="search"
							placeholder="Pretraži"
							v-model="search"
							hide-details
							class="hidden-sm-and-down"
							></v-text-field>
							<v-btn v-if="events.selected[0]" color="error darken-2" @click="multiDeleteDialog">
								Izbriši označeno
							</v-btn>
							<v-btn icon>
								<v-icon>filter_list</v-icon>
							</v-btn>
						</v-toolbar>
						<v-divider></v-divider>
						<v-card-text class="pa-0">
							<v-data-table
								:headers="events.headers"
								:search="search"
								:items="events.items"
								:rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
								class="elevation-1"
								item-key="_id"
								select-all
								v-model="events.selected"
								>
								<template slot="items" slot-scope="props">
									<td>
										<v-checkbox
											primary
											hide-details
											v-model="props.selected"
										></v-checkbox>
									</td>
									<td>{{ props.item.name }}</td>
									<td>{{ props.item.attendingCount }}</td>
									<td>{{ props.item.interestedCount }}</td>
									<td>{{ props.item.startTime | moment("DD.MM.YYYY, H:mm") }}</td>
                                    <td>{{ props.item.endTime | moment("DD.MM.YYYY, H:mm") }}</td>
									<td>{{ props.item.publishStatus }}</td>
									<td>
										<span v-if="permission">
											<router-link tag="span" :to="'/dashboard/event/' + props.item._id + '/edit'">
												<v-btn depressed icon dark small>
													<v-icon>edit</v-icon>
												</v-btn>
											</router-link>
											<v-btn @click="deleteDialog(props.item._id, props.item.name)" depressed icon dark small>
												<v-icon>delete</v-icon>
											</v-btn>
										</span>
										<router-link tag="span" :to="'/dashboard/event/' + props.item._id">
											<v-btn depressed icon dark small>
												<v-icon>remove_red_eye</v-icon>
											</v-btn>
										</router-link>
									</td>
								</template>
							</v-data-table>
						</v-card-text>
					</v-card>
				</v-flex>  

			</v-layout>
		</v-container>

		<v-dialog v-model="deleteEvent.dialog" width="500">
			<v-card>
				<div style="text-align: center;">
					<v-icon style="font-size: 10em; padding: 0.2em;" color="error darken-2">error_outline</v-icon>
					<div class="subheading">Jeste li sigurni da želite obrisati događaj {{ deleteEvent.name }}?</div>
				</div>
				<br>
				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn color="error darken-2" @click="deleteEventFunction">
						DA
					</v-btn>
					<v-btn @click="resetDeleteDialog">
						NE
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="events.deleteDialog" width="500">
			<v-card>
				<div style="text-align: center;">
					<v-icon style="font-size: 10em; padding: 0.2em;" color="error darken-2">error_outline</v-icon>
					<div class="subheading">Jeste li sigurni da želite obrisati označene događaje?</div>
				</div>
				<br>
				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn color="error darken-2" @click="multiDelete">
						DA
					</v-btn>
					<v-btn @click="events.deleteDialog = false">
						NE
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from 'axios'
import getFBEvents from "@/components/dashboard/GetFBEvents.vue"

export default {
	components: {
		getFBEvents
	},
	data() {
		return {
			permission: false,
			search: '',
			deleteEvent: {
				dialog: false,
				eventId: null,
                name: null,
			},
			events: {
				deleteDialog: false,
				selected: [],
				eventIds: [],
				headers: [
					{
						text: 'Naziv',
						value: 'name'
					},
					{
						text: 'Dolazi',
						value: 'attendingCount'
					},
					{
						text: 'Zainteresirano',
						value: 'interestedCount'
					},
					{
						text: 'Početak',
						value: 'startTime'
                    },
                    {
						text: 'Završetak',
						value: 'endTime'
					},
					{
						text: 'Status',
						value: 'publishStatus'
					},
					{
						text: '',
						value: '',
						sortable: false
					}
				],
				items: []
			},    
		}
	},
	mounted() {
		this.$store.dispatch('permissionAllowed', [0, 1, 2, 3]).then(
			perm => {
				this.permission = perm
				return this.permission
			}
		)


		axios.get('/api/events')
		.then(res => {
			if(res.data.success == true){
				this.events.items = res.data.events
			}
		})
	},
	methods: {
		updateEvents(){
			axios.get('/api/events')
			.then(res => {
				if(res.data.success == true){
					this.events.items = res.data.events
				}
			})
		},

		deleteDialog(id, name) {
			this.deleteEvent.dialog = true
			this.deleteEvent.eventId = id
			this.deleteEvent.name = name
		},

		resetDeleteDialog(){
			this.deleteEvent.dialog = false
			this.deleteEvent.eventId = null
			this.deleteEvent.name = null
		},

		deleteEventFunction() {
			axios.get('/api/event/' + this.deleteEvent.eventId + '/delete')
			.then(res => {
				if(res.data.success == true){
					this.events.items = res.data.events

					this.resetDeleteDialog()
				}
			})
		},



		multiDeleteDialog() {
			this.events.deleteDialog = true
			this.events.eventIds = []
			
			this.events.selected.forEach(event => {
				this.events.eventIds.push(event._id)
			})

		},

		resetMultiDeleteDialog() {
			this.events.deleteDialog = false
			this.events.selected = []
			this.events.eventIds = []
		},

		multiDelete() {
			axios.post('/api/events/multidelete', {
				events: this.events.eventIds
			})
			.then(res => {
				if(res.data.success == true){
					this.events.items = res.data.events

					this.resetMultiDeleteDialog()
				}
			})
		}
	}
};
</script>