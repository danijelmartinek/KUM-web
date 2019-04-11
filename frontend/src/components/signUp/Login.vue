<template>
	<div class="login">
		<div class="loginErrors" style="padding: 2em 2em 0em 2em; color: #ff0055">
			<h4 v-for="(err, i) in login.errors" :key="i">
				{{ err }}
			</h4>
			<h4>{{login.status}}</h4>
		</div>

		<v-form style="padding: 0em 2em 2em 2em;">
			<v-flex xs12>
				<v-text-field
					v-model="login.email"
					label="E-mail"
					required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-text-field
					v-model="login.password"
					label="Password"
					type="password"
					required
				></v-text-field>
			</v-flex>
			<v-btn @click="loginHandler">
			Login
			</v-btn>
		</v-form>
	</div>
</template>

<script>
import axios from "axios"

export default {
  name: 'login',
  props: ['lastRoute'],
  data() {
    return {
		login: {
			email: null,
			password: null,
			errors: [],
			status: null
		}
    }
  },
  methods:{

    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },

    loginValidate() {
      
      this.login.errors = []

      if(!this.login.email) {
        this.login.errors.push("Email required.")
      } else if(!this.validateEmail(this.login.email)) {
        this.login.errors.push("Email must be in format example@domain.com")
      }
      if(!this.login.password) this.login.errors.push("Password required.")

      if(!(this.login.errors && this.login.errors.length)){
        return true
      } else{
        return false
      }
      
    },
    loginHandler() {
      let valid = this.loginValidate()

      const loginUserData = {
        email: this.login.email,
        password: this.login.password,
      }

      if(valid) {
        axios.post("/api/login", loginUserData)
        .then(res => {
          if (res.data.success == true) {
            this.$store.dispatch('authUser')

            if(this.lastRoute){
              this.$router.push({
                path: this.lastRoute.path
              })
            } else {
              this.$router.push({
                name: "Home"
              })
            }
          } else {
            this.login.status = res.data.message
          }
        })
      }
    }
  }
}
</script>
