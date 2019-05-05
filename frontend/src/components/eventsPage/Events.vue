<template>
	<div id="events">
		<v-container grid-list-xl fluid>
			<v-layout row wrap>
				<v-flex sm12>
					<h3>Događaji</h3>
				</v-flex>  
				<v-flex offset-sm1 sm5>
					<div id="eventsListContainer">
						<div class="eventInList"  :class="{'eventSelected': (index == 0)}" @click="selectEvent(index)" v-for="(event, index) in events" :key="event._id">
							<v-card color="#070b34" class="white--text elevation-12">
								<v-card-title primary-title>
									<div>
										<v-chip v-if="timeNow > new Date(event.startTime)" color="#141852" text-color="white" :small="true">
											<span class="dot"></span>
											{{ event.startTime | moment("DD.MM.YYYY") }}
										</v-chip>
										<v-chip v-else class="font-weight-bold" color="#1bae00" text-color="white" :small="true">
											<span class="dotIncoming"></span>
											{{ event.startTime | moment("DD.MM.YYYY") }}
										</v-chip>
										<div class="headline">{{event.name}}</div>
									</div>
								</v-card-title>
							</v-card>
						</div>
					</div>
				</v-flex>

				<v-flex sm5>
					<SelectedEvent :selectedEvent="selectedEvent" ></SelectedEvent>
				</v-flex>

			</v-layout>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios'
import SelectedEvent from "@/components/eventsPage/SelectedEvent.vue"

export default {
	components: {
		SelectedEvent
	},
	data() {
		return {
			timeNow: new Date(),
			currentSelectedEventIndex: 0,
			events: [],
			selectedEvent: {
				cover: {
					source: ""
				},
				eventTimes: []
			}
		}
	},
	mounted() {

		axios.get('/api/events')
		.then(res => {
			if(res.data.success == true){
				this.events = res.data.events
				this.selectedEvent = res.data.events[0]
				this.getEventTimes()
			}
		})
	},
	methods: {
		getEventTimes(){
			if(!(this.selectedEvent.eventTimes[0])){
				this.selectedEvent.eventTimes.push({
					startTime: this.selectedEvent.startTime,
					endTime: this.selectedEvent.endTime
				})
			}
		},
		selectEvent(index){
			let events = document.getElementsByClassName("eventInList")
			
			events[this.currentSelectedEventIndex].classList.remove("eventSelected")
			this.currentSelectedEventIndex = index
			
			events[index].classList.add("eventSelected")
			this.selectedEvent = this.events[index]

			this.getEventTimes()
		}
	}
};
</script>

<style scoped>
#events{
	width: 100%;
	height: 100%;
	background-color: #1F2348;
}

#eventsListContainer{
	width: 100%;
	height: 720px;
	padding: 1em;
	overflow: scroll;
}

#eventsListContainer::-webkit-scrollbar {
		display: none;
}

.eventInList{
	padding: 0.5em;
	margin: 1em;
	cursor: pointer;
}

.eventSelected{
	background-color: #555892;
}
.dot{
	height: 0.5em;
	width: 0.5em;
	margin: 0.2em 0.7em 0.2em 0em;
	background-color: #ff0000;
	border-radius: 50%;
	display: inline-block;
}
.dotIncoming{
	height: 0.5em;
	width: 0.5em;
	margin: 0.2em 0.7em 0.2em 0em;
	background-color: #ffffff;
	border-radius: 50%;
	display: inline-block;
}
</style>
