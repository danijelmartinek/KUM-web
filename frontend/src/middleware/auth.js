import {store} from "@/store/index.js"
import router from "@/router/index.js"

export default function auth(to, from, next) {
    store.dispatch("authUser").then(() => {
        if (!store.state.user) {
            router.push({name: 'SignUp'})
            store.state.lastRoute = to
        }
        next()
    })
  }