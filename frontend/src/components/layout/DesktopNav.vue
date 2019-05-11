<template>
    <div>
        <div id="leftSpacer"></div>
        <sidebar-menu :menu="menu" @collapse="onCollapse" :collapsed="true" width="200px"></sidebar-menu>
    </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { itemController } from './navItemController.js'


export default {
    components: {
        SidebarMenu
	},
    data() {
        return {
            menu: [],
            menuIcons: [],
            collapseHandler: 0
        }
    },
    created(){
        itemController(this.$store, false).then(items => {
            this.menu = items.expRoutes
            return items
        }).then(i => {
            this.menuIcons = i.expRouteIcons
        })

        window.addEventListener('load', () => {
            this.loadIcons(this.menuIcons)
        })
    },
    methods: {
        onCollapse(){
            if(this.collapseHandler == 0){
                document.getElementById("leftSpacer").style.width = 200 + "px"
                this.collapseHandler = 1
            } else {
                document.getElementById("leftSpacer").style.width = 50 + "px"
                this.collapseHandler = 0
            }
            
        },

        loadIcons(iconsArray){
            iconsArray.forEach((icon, index) => {
                let ic = document.getElementsByClassName('vsm-icon')[index];
                ic.innerHTML = icon;
            })
        }
    }
}
</script>

<style>
#leftSpacer{
    width: 50px;
    transition: 0.3s;
    display: none;
}

.v-sidebar-menu {
    display: none;
}

@media screen and (min-width: 960px) {
	.v-sidebar-menu {
        display: block;
    }
    #leftSpacer{
        display: block;
    }
}

.v-sidebar-menu .vsm-arrow:after{
    font-family: 'Material Icons';
}
.v-sidebar-menu .collapse-btn:after {
    content: 'more_horiz';
    font-family: 'Material Icons';
    font-size: 1.5em;
}

.v-sidebar-menu .vsm-item.first-item.active-item>.vsm-link, .v-sidebar-menu .vsm-item.first-item.parent-active-item>.vsm-link {
    -webkit-box-shadow: 3px 0px 0px 0px #fd6230 inset;
    box-shadow: 3px 0px 0px 0px #fd6230 inset;
}

.v-sidebar-menu .vsm-mobile-bg {
    background: rgb(253,29,29);
	background: linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%);
}

.hidden{
    display: none;
}
</style>
