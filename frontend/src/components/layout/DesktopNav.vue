<template>
    <div>
        <div id="leftSpacer"></div>
        <sidebar-menu :menu="menu" @collapse="onCollapse" :collapsed="true" width="250px"></sidebar-menu>
    </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


export default {
    components: {
        SidebarMenu
	},
    data() {
        return {
            menuIcons: ['home', 'event', 'account_circle','group', 'event_note'],
            menu: [
                {
                    header: true,
                    title: 'Navigacija',
                    // component: componentName
                    // visibleOnCollapse: true
                    //class:'hidden'
                    // attributes: {}
                },
                {
                    href: '/',
                    title: 'Početna',
                    icon: 'v-icon material-icons'
                },
                {
                    href: '/events',
                    title: 'Događaji',
                    icon: 'v-icon material-icons',
                },
                {
                    href: '/signup',
                    title: 'Login',
                    icon: 'v-icon material-icons',
                },
                {
                    header: true,
                    title: 'Dashboard',
                    // component: componentName
                    // visibleOnCollapse: true
                    //class:'hidden'
                    // attributes: {}
                },
                {
                    href: '/dashboard/users',
                    title: 'Korisnici',
                    icon: 'v-icon material-icons'
                },
                {
                    href: '/dashboard/events2',
                    title: 'Eventi',
                    icon: 'v-icon material-icons',
                }
            ],
            collapseHandler: 0
        }
    },
    mounted(){
        this.menuIcons.forEach((icon, index) => {
            let ic = document.getElementsByClassName('vsm-icon')[index];
            ic.innerHTML = icon;
        })
    },
    methods: {
        onCollapse(){
            if(this.collapseHandler == 0){
                document.getElementById("leftSpacer").style.width = 250 + "px"
                this.collapseHandler = 1
            } else {
                document.getElementById("leftSpacer").style.width = 50 + "px"
                this.collapseHandler = 0
            }
            
        },
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
