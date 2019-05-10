<template>
    <div id="selectedEventInfo">
        <v-card class="elevation-0" color="#12152b">
            <v-img
            :src="selectedEvent.cover.source"
            lazy-src="https://cdn.dribbble.com/users/830587/screenshots/4381223/loader_gif.gif"
            aspect-ratio="1.7778"
            class="eventCover"
            ></v-img>

            <div>
                <h3 class="headline ma-3">{{ selectedEvent.name }}</h3> 
            </div>

            <div id="eventTimes" class="pb-1">
                <div
                v-for="time in selectedEvent.eventTimes.slice().reverse()" 
                :key="time._id"
                >
                    <v-chip class="py-3" color="#1b1f40" text-color="white" :small="true">
                        <span class="pr-3">{{ time.startTime | moment("DD.MM.YYYY") }}</span>
                        <span>{{ time.startTime | moment("H:mm") }} - {{ time.endTime | moment("H:mm") }}</span>
                    </v-chip>
                </div>
            </div>

            <v-card-actions class="eventTab">
                <a href="#opis"><v-btn flat color="rgba(253,98,48,1)">Opis</v-btn></a>
                <a href="#lokacija"><v-btn flat color="rgba(253,98,48,1)">Lokacija</v-btn></a>
                <a href="#komentari"><v-btn flat color="rgba(253,98,48,1)">Komentari</v-btn></a>
            </v-card-actions>

            <carousel 
                class="jobs" 
                :loop="false" 
                :dots="true" 
                :nav="false" 
                :margin="30"  
                :responsive="{0:{items:1,nav:false}}"
                :URLhashListener="true"
            >
                <div data-hash="opis" class="eventDescription"><pre>{{ selectedEvent.description }}</pre></div>
                <div data-hash="lokacija"><Location :eventLocation="eventLocation"></Location></div>
                <div data-hash="komentari" class="eventDescription"><pre>{{ selectedEvent.description }}</pre></div>
            </carousel>
        </v-card>
    </div>
</template>

<script>
import carousel from 'v-owl-carousel' 
import Location from "@/components/eventsPage/Location.vue"

export default {
    components: {
      carousel,
      Location
    },
    props: ['selectedEvent'],
	data() {
		return {
            timeNow: new Date(),
            eventLocation: {}
		}
    },
    mounted(){
        this.$nextTick(function() {
            window.addEventListener('resize', this.ajustWidthAndHeight)

            //Init
            this.ajustWidthAndHeight()
        })
    },
    methods: {
        ajustWidthAndHeight: () => {
            var elemWidth = document.getElementById('selectedEventInfo').offsetWidth
            document.getElementById('eventTimes').style.width = elemWidth - 30 + "px";
        }
    },
    watch: { 
        selectedEvent: function() {
            this.eventLocation = this.selectedEvent.place
        }
    },
    beforeDestroy(){
        window.removeEventListener('resize', () => {})
    }
};
</script>

<style scoped>

#selectedEventInfo{
	width: 100%;
	padding: 1em;
	background-color: #12152b;
}

#eventTimes{
    overflow: auto;
    white-space: nowrap;
    overflow: scroll;
    overflow-y: hidden;
}

#eventTimes > div{
    display: inline;
}

/* width */
#eventTimes::-webkit-scrollbar {
    margin: 0.5em;
    height: 5px;
}

/* Track */
#eventTimes::-webkit-scrollbar-track {
    background: #12152b;
}
 
/* Handle */
#eventTimes::-webkit-scrollbar-thumb {
  background: #1b1f40; 
}

/* Handle on hover */
#eventTimes::-webkit-scrollbar-thumb:hover {
  background: #35385a; 
}

.eventDescription{
	max-height: 200px;
    overflow: scroll;
    overflow-x: hidden;
}

/* width */
.eventDescription::-webkit-scrollbar {
    width: 5px;
}

/* Track */
.eventDescription::-webkit-scrollbar-track {
    background: #12152b;
}
 
/* Handle */
.eventDescription::-webkit-scrollbar-thumb {
    background: #1b1f40; 
}

/* Handle on hover */
.eventDescription::-webkit-scrollbar-thumb:hover {
    background: #35385a; 
}

.eventDescription pre{
    white-space: pre-wrap; 
    word-wrap: break-word;
    font-family: inherit;
}

.eventTab > a{
    text-decoration: none;
}
</style>
