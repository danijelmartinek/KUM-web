<template>
    <v-container>
        <div class="login-register">
            <v-tabs v-model="tabsModel" fixed-tabs>
                <v-tab
                v-for="tab in tabs"
                :key="tab.id"
                >
                {{ tab.tag }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabsModel"  >
                <v-tab-item>
                <v-card flat>
                    <login></login>
                </v-card>
                </v-tab-item>
                <v-tab-item>
                <v-card flat>
                    <register></register>
                </v-card>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </v-container>
</template>

<script>
import register from "@/components/signUp/Register.vue"
import login from "@/components/signUp/Login.vue"

export default {
  name: 'SignUpPage',
  data() {
		return {
      tabsModel: null,
			tabs: [
        {
          id: 1,
          tag: "Prijava"
        },
        {
          id: 2,
          tag: "Registracija"
        }
      ]
		}
	},
  components: {
    register,
    login
  }
}
</script>