<template>
  <v-navigation-drawer
		v-model="$store.state.navDrawer"
		fixed
		clipped
		app
	>
		<v-list dense>
			<v-list-tile v-for="item in items" :key="item.text">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>
						{{ item.text }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	data: () => ({
		items: [
			{ icon: 'trending_up', text: 'Most Popular' },
			{ icon: 'subscriptions', text: 'Subscriptions' },
			{ icon: 'history', text: 'History' },
			{ icon: 'featured_play_list', text: 'Playlists' },
			{ icon: 'watch_later', text: 'Watch Later' }
		],
		items2: [
			{ picture: 28, text: 'Joseph' },
			{ picture: 38, text: 'Apple' },
			{ picture: 48, text: 'Xbox Ahoy' },
			{ picture: 58, text: 'Nokia' },
			{ picture: 78, text: 'MKBHD' }
		]
	}),
	
	name: 'Sidebar',
}
</script>