<template>
	<div id="userTable" style="width: 100%;">
		<v-container grid-list-xl fluid>
			<v-layout row wrap>
				<v-flex sm12>
					<h3>Korisnici</h3>
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
							<v-btn v-if="users.selected[0]" color="error darken-2" @click="multiDeleteDialog">
								Izbriši označeno
							</v-btn>
							<v-btn icon>
								<v-icon>filter_list</v-icon>
							</v-btn>
						</v-toolbar>
						<v-divider></v-divider>
						<v-card-text class="pa-0">
							<v-data-table
								:headers="users.headers"
								:search="search"
								:items="users.items"
								:rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
								class="elevation-1"
								item-key="email"
								select-all
								v-model="users.selected"
								>
								<template slot="items" slot-scope="props">
									<td>
										<v-checkbox
											primary
											hide-details
											v-model="props.selected"
										></v-checkbox>
									</td>              
									<td>
										<v-avatar size="32">
										<img :src="props.item.avatar" alt="">
										</v-avatar> 
									</td>
									<td>{{ props.item.firstName }}</td>
									<td>{{ props.item.lastName }}</td>
									<td>{{ props.item.email }}</td>
									<td>{{ props.item.phone }}</td>
									<td>{{ props.item.role.roleCaption }}</td>
									<td class="justify-center">
										<v-checkbox 
											primary 
											hide-details 
											:readonly="true" 
											:light="true" 
											:input-value="props.item.membershipFeePaid">
										</v-checkbox>
									</td>
									<td>
										<span v-if="permission">
											<router-link tag="span" :to="'/dashboard/user/' + props.item._id + '/edit'">
												<v-btn depressed icon dark small>
													<v-icon>edit</v-icon>
												</v-btn>
											</router-link>
											<v-btn @click="deleteDialog(props.item._id, props.item.firstName, props.item.lastName)" depressed icon dark small>
												<v-icon>delete</v-icon>
											</v-btn>
										</span>
										<router-link tag="span" :to="'/user/' + props.item._id">
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

		<v-dialog v-model="deleteUser.dialog" width="500">
			<v-card>
				<div style="text-align: center;">
					<v-icon style="font-size: 10em; padding: 0.2em;" color="error darken-2">error_outline</v-icon>
					<div class="subheading">Jeste li sigurni da želite obrisati korisnika {{ deleteUser.firstName }} {{ deleteUser.lastName }}?</div>
				</div>
				<br>
				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn color="error darken-2" @click="deleteUserFunction">
						DA
					</v-btn>
					<v-btn @click="resetDeleteDialog">
						NE
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="users.deleteDialog" width="500">
			<v-card>
				<div style="text-align: center;">
					<v-icon style="font-size: 10em; padding: 0.2em;" color="error darken-2">error_outline</v-icon>
					<div class="subheading">Jeste li sigurni da želite obrisati označene korisnike?</div>
				</div>
				<br>
				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn color="error darken-2" @click="multiDelete">
						DA
					</v-btn>
					<v-btn @click="users.deleteDialog = false">
						NE
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			permission: false,
			search: '',
			deleteUser: {
				dialog: false,
				userId: null,
				firstName: null,
				lastName: null,
			},
			users: {
				deleteDialog: false,
				selected: [],
				userIds: [],
				headers: [
					{
						text: 'Avatar',
						value: 'avatar',
						sortable: false
					},
					{
						text: 'Ime',
						value: 'firstName'
					},
					{
						text: 'Prezime',
						value: 'lastName'
					},
					{
						text: 'Email',
						value: 'email'
					},
					{
						text: 'Broj mobitela',
						value: 'phone'
					},
					{
						text: 'Uloga',
						value: 'roleCaption'
					},
					{
						text: 'Članarina plaćena',
						value: 'membershipFeePaid',
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


		axios.get('/api/users')
		.then(res => {
			if(res.data.success == true){
				this.users.items = res.data.users
			}
		})
	},
	methods: {
		deleteDialog(id, firstName, lastName) {
			this.deleteUser.dialog = true
			this.deleteUser.userId = id
			this.deleteUser.firstName = firstName
			this.deleteUser.lastName = lastName
		},

		resetDeleteDialog(){
			this.deleteUser.dialog = false
			this.deleteUser.userId = null
			this.deleteUser.firstName = null
			this.deleteUser.lastName = null
		},

		deleteUserFunction() {
			axios.get('/api/user/' + this.deleteUser.userId + '/delete')
			.then(res => {
				if(res.data.success == true){
					this.users.items = res.data.users

					this.resetDeleteDialog()
				}
			})
		},



		multiDeleteDialog() {
			this.users.deleteDialog = true
			this.users.userIds = []
			
			this.users.selected.forEach(user => {
				this.users.userIds.push(user._id)
			})

		},

		resetMultiDeleteDialog() {
			this.users.deleteDialog = false
			this.users.selected = []
			this.users.userIds = []
		},

		multiDelete() {
			axios.post('/api/users/multidelete', {
				users: this.users.userIds
			})
			.then(res => {
				if(res.data.success == true){
					this.users.items = res.data.users

					this.resetMultiDeleteDialog()
				}
			})
		}
	}
};
</script>