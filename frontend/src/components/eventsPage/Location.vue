<template>
	<div id="eventLocation">
        <div v-if="locationExists">
            <div id="LmapId"></div>
        </div>
        <div v-else>Događaj nema lokaciju.</div>
	</div>
</template>

<script>
/* eslint-disable */

export default {
    name: 'EventLocation',
    props: ['eventLocation'],
    data () {
        return {
            Lmap: {},
            iconUrl: {},
            layerGroup: {},
            LmapOptions: {
                center: [46.024948, 16.545330],
                watch: true,
                zoom: 16,
                zoomControl: false,
            },
            locationExists: true
        }
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap(){
            var LmapElement = document.getElementById('LmapId')

            this.$nextTick(() => {

                this.Lmap = L.map('LmapId', this.LmapOptions)


                this.Lmap.dragging.disable()

                // Mapbox - add your access token
                L.mapbox.accessToken = 'pk.eyJ1IjoiZGFuaWplbG1yIiwiYSI6ImNqcG8xZG9jZDA5MXU0OHAxNDAyMjB4dWIifQ.K7aAZQ5yogCd_uAJpQ-hvg';
                // Mapbox - add the style to your map as image tiles
                L.mapbox.styleLayer('mapbox://styles/danijelmr/cjvgrggal09r51fk1o0omw4ce').addTo(this.Lmap);
                
                var svg = '<svg xmlns="http://www.w3.org/2000/svg" height="120" width="120"><circle cx="60" cy="60" r="60" fill="rgba(253,98,48,1)" opacity="0.3" /><circle cx="60" cy="60" r="40" fill="red" />Sorry, your browser does not support inline SVG.</svg>'
                this.iconUrl = encodeURI("data:image/svg+xml," + svg).replace('#','%23')

                var redIcon = L.icon({
                    iconUrl: this.iconUrl,
                    iconSize: [20, 20], // size of the icon
                });

                this.layerGroup = L.layerGroup().addTo(this.Lmap)

                L.marker([46.024948, 16.545330], {icon: redIcon}).addTo(this.layerGroup);

                //add zoom control with your options
                L.control.zoom({
                    position:'topright'
                }).addTo(this.Lmap)

                document.getElementsByClassName("leaflet-control-zoom")[0].style.border = "0px"
                document.getElementsByClassName("leaflet-control-zoom-in")[0].style = "background-color: rgba(255,255,255,0); font-size: 3em;"
                document.getElementsByClassName("leaflet-control-zoom-out")[0].style = "background-color: rgba(255,255,255,0); font-size: 3em;"
                
            })
        }
    },
    watch: { 
      	eventLocation: function() {

            if(this.eventLocation != undefined && this.eventLocation.location != undefined){
                
                if(!this.locationExists){
                    this.initMap()
                    this.locationExists = true
                } 

                var redIcon = L.icon({
                    iconUrl: this.iconUrl,
                    iconSize: [20, 20], // size of the icon
                })

                this.layerGroup.clearLayers();
                L.marker([this.eventLocation.location.latitude, this.eventLocation.location.longitude], {icon: redIcon}).addTo(this.layerGroup)
                this.Lmap.panTo(new L.LatLng(this.eventLocation.location.latitude, this.eventLocation.location.longitude))
            } else {
                this.locationExists = false
            }    
        }
    }
}
</script>

<style scoped>
#eventLocation{
	width: 100%;
}
#LmapId{
    width: 100%;
    height: 200px;
    position: absolute;
}
</style>