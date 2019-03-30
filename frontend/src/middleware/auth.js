import {store} from "@/store/index.js"
import router from "@/router/index.js"

export default function auth(to, from, next) {
    if (Object.keys(store.state.user).length === 0 && store.state.user.constructor === Object) {
        router.push({name: 'SignUp'});
    }
    next()
  }