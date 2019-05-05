<template>
    <div id="selectedEventInfo" class="elevation-12">
        <v-card class="elevation-0" color="#070b34">
            <v-img
            :src="selectedEvent.cover.source"
            lazy-src="https://cdn.dribbble.com/users/830587/screenshots/4381223/loader_gif.gif"
            aspect-ratio="1.7778"
            class="eventCover"
            ></v-img>

            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-3">{{ selectedEvent.name }}</h3>
                    <div
                    v-for="time in selectedEvent.eventTimes.slice().reverse()" 
                    :key="time._id" 
                    class="eventTimes"
                    >
                        <span>{{ time.startTime | moment("DD.MM.YYYY") }}</span>
                        <span style="float: right;">{{ time.startTime | moment("H:mm") }} - {{ time.endTime | moment("H:mm") }}</span>
                        <v-divider></v-divider>
                    </div>
            </div>
            </v-card-title>
            <v-card-actions>
                <a href="#opis"><v-btn flat color="orange">Opis</v-btn></a>
                <a href="#lokacija"><v-btn flat color="orange">Lokacija</v-btn></a>
                <a href="#komentari"><v-btn flat color="orange">Komentari</v-btn></a>
            </v-card-actions>
            <carousel 
                class="jobs" 
                :loop="false" 
                :dots="true" 
                :nav="false" 
                :responsive="{0:{items:1,nav:false}}"
                :URLhashListener="true"
            >
                <div data-hash="opis" class="eventDescription"><pre>{{ selectedEvent.description }}</pre></div>
                <div data-hash="lokacija" class="eventDescription"><pre>{{ selectedEvent.description }}</pre></div>
                <div data-hash="komentari" class="eventDescription"><pre>{{ selectedEvent.description }}</pre></div>
            </carousel>
        </v-card>
    </div>
</template>

<script>
import carousel from 'v-owl-carousel' 

export default {
    components: {
      carousel
    },
    props: ['selectedEvent'],
	data() {
		return {
			timeNow: new Date()
		}
	}
};
</script>

<style scoped>

#selectedEventInfo{
	width: 100%;
	height: 100%;
	padding: 1em;
	background-color: #070b34;
}

.eventDescription{
	max-height: 180px;
	overflow: scroll;
}

.eventDescription::-webkit-scrollbar {
		display: none;
}

.eventDescription pre {
  white-space: pre-wrap; 
  word-wrap: break-word;
  font-family: inherit;
}
</style>
