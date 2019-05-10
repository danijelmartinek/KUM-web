export function itemController(store, isMobile){

    return new Promise(resolve => {

        const routes = [
            {
                header: true,
                title: "Navigacija",
                permission: "all",
                type: "header"
            },
            {
                href: "/",
                title: "Početna",
                icon: 'v-icon material-icons',
                rIcon: "home",
                permission: "all",
                type: "item"
            },
            {
                href: "/events",
                title: "Događaji",
                icon: 'v-icon material-icons',
                rIcon: "event",
                permission: "all",
                type: "item"
            },
            {
                href: "/signup",
                title: "Login",
                icon: 'v-icon material-icons',
                rIcon: "account_circle",
                permission: "all",
                type: "item"
            },
            {
                header: true,
                title: "Dashboard",
                permission: [1, 2, 3],
                type: "header"
            },
            {
                href: "/dashboard/users_",
                title: "Users",
                icon: 'v-icon material-icons',
                rIcon: "group",
                permission: [1, 2, 3],
                type: "item"
            },
            {
                href: "/dashboard/events_",
                title: "Events",
                icon: 'v-icon material-icons',
                rIcon: "event_note",
                permission: [1, 2, 3],
                type: "item"
            },
        ]

        let expRoutes = []
        let expRouteIcons = []

        routes.forEach((route, index) => {
            if(route.type === "header" && isMobile == false){
                if(route.permission === "all" ){
                    expRoutes.push(route)
                } else {
                    store.dispatch('permissionAllowed', route.permission).then(
                        perm => {
                            if(perm == true){
                                expRoutes.push(route)
                            }
                        }
                    ).then(() => {
                        if((routes.length - 1) == index){
                            resolve({ expRoutes, expRouteIcons })
                        }
                    })
                }
            } else if(route.type === "item" || route.type === "dashboard-item") {
                if(route.permission === "all"){
                    expRoutes.push(route)
                    expRouteIcons.push(route.rIcon)
                } else {
                    store.dispatch('permissionAllowed', route.permission).then(
                        perm => {
                            if(perm == true){
                                expRoutes.push(route)
                                expRouteIcons.push(route.rIcon)
                            }
                        }
                    ).then(() => {
                        if((routes.length - 1) == index){
                            resolve({ expRoutes, expRouteIcons })
                        }
                    })
                }
            }
        })

    })
}