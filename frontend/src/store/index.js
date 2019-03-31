import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        navDrawer: false,
        user: null,
        userEmails: [],
        permission: false
    },
    mutations: {
        logoutUser(state) {
            axios.get("/api/logout")
            .then(res => {
                if(res.data.success == true){
                    state.user = null
                }
            })
        },
        getEmails(state) {
            axios.get("/api/emails")
            .then(res => {
                if(res.data.success == true){
                    state.userEmails = res.data.userEmails
                }
            })
        },
        permissionAllowed(state, permissionArray){
            permissionArray.forEach(role => {
                if(state.user.role === role){
                    state.permission = true
                } 
            })
        }
    },
    actions: {
        authUser(context) {
            return new Promise((resolve) => {
                if(!context.state.user){
                    axios.get("/api/auth")
                    .then(res => {
                        if(res.data.success == true){
                            context.state.user = res.data.userData
                        }
                        resolve(res)
                    }, error => {
                        resolve(error)
                    })
                }
            })
        }
    }
});