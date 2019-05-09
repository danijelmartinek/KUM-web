import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userAuthenticated: false,
        user: null,
        userEmails: [],
        lastRoute: null
    },
    getters: {
        checkAuth(state) { return state.userAuthenticated }
    },
    mutations: {
        logoutUser(state) {
            axios.get("/api/logout")
            .then(res => {
                if(res.data.success == true){
                    state.userAuthenticated = false
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
        }
    },
    actions: {
        authUser(context) {
            if(!context.state.userAuthenticated){
                return new Promise(resolve => {
                    axios.get("/api/auth")
                    .then(res => {
                        if(res.data.success == true){
                            context.state.userAuthenticated = true
                            context.state.user = res.data.userData
                        }
                        resolve(context.state.userAuthenticated)
                    }, error => {
                        resolve(error)
                    })
                })
            }
            else{
                return context.state.userAuthenticated
            }
        },
        permissionAllowed(context, permissionArray){
            if(context.state.userAuthenticated){
                return new Promise(resolve => {
                    resolve(permissionArray.includes(context.state.user.role.roleLevel))
                })
            }else{
                return true
            }
        }
    }
});