<template>
	<div class="register">
		<div class="registerErrors" style="padding: 2em 2em 0em 2em; color: #ff0055">
			<h4 v-for="(err, i) in register.errors" :key="i">
				{{ err }}
			</h4>
			<h4>{{register.status}}</h4>
		</div>

		<v-form style="padding: 0em 2em 2em 2em;">
			<v-flex xs12>
				<v-text-field
					v-model="register.email"
					label="E-mail"
					required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-text-field
					v-model="register.password"
					label="Password"
					type="password"
					required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-text-field
					v-model="register.confirmPassword"
					label="Confirm Password"
					type="password"
					required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-text-field
					v-model="register.firstName"
					label="First Name"
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-text-field
					v-model="register.lastName"
					label="Last Name"
				></v-text-field>
			</v-flex>
			<v-btn @click="registerHandler">
			Register
			</v-btn>
		</v-form>
		<v-dialog v-model="register.dialog" persistent width="500">
			<v-card>
				<div style="text-align: center;">
					<v-icon style="font-size: 10em; padding: 0.2em;" color="green darken-2">check_circle_outline</v-icon>
					<div class="title"> You have been successfully registered.</div>
				</div>
				<br>
				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn @click="successfullyRegistered">
						OK
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from "axios"

export default {
  name: 'register',
  props: ['lastRoute'],
  data() {
    return {
      register: {
        email: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null,
        errors: [],
        status: null,
        dialog: false
      }
    };
  },
  mounted() {
    this.$store.commit('getEmails');
  },
  methods: {

    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },

    registerValidate() {
      
      this.register.errors = []

      if(!this.register.email) {
        this.register.errors.push("Email required.")
      } else if(!this.validateEmail(this.register.email)) {
        this.register.errors.push("Email must be in format example@domain.com")
      }  else if(this.$store.state.userEmails.includes(this.register.email)) {
        this.register.errors.push("Email is not allowed. Please choose another one.")
      }

      if(!this.register.password) this.register.errors.push("Password required.")
      if(!this.register.confirmPassword) {
        this.register.errors.push("Confirm Password required.")
      } else if(this.register.password != this.register.confirmPassword) {
        this.register.errors.push("Passwords must match")
      }
      if(!this.register.firstName) this.register.errors.push("First name required.")
      if(!this.register.lastName) this.register.errors.push("Last name required.")

      if(!(this.register.errors && this.register.errors.length)){
        return true
      } else{
        return false
      }
      
    },

    registerHandler() {

      let valid = this.registerValidate();

      const registerUserData = {
        email: this.register.email,
        password: this.register.password,
        firstName: this.register.firstName,
        lastName: this.register.lastName
      }

      if(valid) {
        axios.post("/api/register", registerUserData)
        .then(res => {
          if (res.data.success == true) {
            this.$store.dispatch('authUser')

            this.register.dialog = true
          } else {
            this.register.status = res.data.message
          }
        })
      }
	},
	
	successfullyRegistered() {
		this.register.dialog = false

		if(this.lastRoute){
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
			this.$router.push({
				name: "Home"
			})
		}
	}
  }
}
</script>
