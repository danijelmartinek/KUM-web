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
							placeholder="Type something"
							v-model="search"
							hide-details
							class="hidden-sm-and-down"
							></v-text-field>     
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
								item-key="name"
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
									<td>{{ props.item.name }}</td>
									<td>{{ props.item.email }}</td>
									<td>{{ props.item.phone }}</td>
									<td v-if="permission">
										<v-btn depressed outline icon fab dark color="primary" small>
											<v-icon>edit</v-icon>
										</v-btn>
										<v-btn depressed outline icon fab dark color="pink" small>
											<v-icon>delete</v-icon>
										</v-btn>
									</td>
								</template>
							</v-data-table>
						</v-card-text>
					</v-card>
				</v-flex>  

			</v-layout>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios'
import { Items as Users } from '@/api/users';
export default {
	data() {
		return {
			permission: false,
			search: '',
			users: {
			selected: [],
			headers: [
				{
					text: 'Avatar',
					value: 'avatar'
				},
				{
					text: 'Name',
					value: 'name'
				},
				{
					text: 'Email',
					value: 'email'
				},
				{
					text: 'Phone',
					value: 'phone'
				},
			],
			items: Users
			},    
		}
	},
	mounted() {
		this.$store.dispatch('permissionAllowed', [0, 1, 2, 3]).then(
			perm => {
				this.permission = perm
				return this.permission
			}
		).then(
			tperm => {
				if(tperm == true){
					this.users.headers.push({
						text: 'Action',
						value: ''
					})
				}
			}
		)
		

		axios
		.get('https://api.backend/users')
		.then(users => (this.items = users))
	}
};
</script>