<template>
  <div>
    <v-toolbar
      class="hidden-md-and-up"
      color="#0c0e1c"
      fixed
      flat
      clipped-right
    >
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="dialog = true"></v-toolbar-side-icon>
    </v-toolbar>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card id="mobileNavCard" color="#0c0e1c">
        <v-toolbar 
          color="transparent"
          fixed
          flat
          clipped-right
        >
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
          <v-container :class="[routesLength > 6 ? 'mobileNavContainer1' : 'mobileNavContainer2']">
            <v-layout row wrap>
              <v-flex v-for="(route, index) in routes" :key="index" xs6 sm4 md3>
                <div class="navElement" @click="dialog = false">
                  <router-link tag="div" :to="route.href">
                    <i class="v-icon material-icons theme--dark">{{ route.rIcon }}</i>
                    <span>{{ route.title }}</span>
                  </router-link>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          <router-link tag="span" to="/signup">
            <div class="signUp" @click="dialog = false">
              <span>Prijavi se</span>
            </div>
          </router-link>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { itemController } from './navItemController.js'

export default {
  data: () => ({
    dialog: false,
    routes: [],
    routesLength: 0
  }),
  mounted(){
    itemController(this.$store, true).then(items => {
      this.routes = items.expRoutes
      this.routesLength = items.length

      this.routes = this.routes.filter(function( obj ) {
        return obj.title !== "Login";
      });
    }) 
  },
  name: 'MobileNav'
}
</script>

<style scoped>
#mobileNavCard{
  min-height: 100%;
}

.mobileNavContainer1 .mobileNavContainer2{
  width: 80%;
  height: 90%;
  position: relative;
}

.mobileNavContainer1 .layout{
  width: 95%;
  margin-bottom: 3em;
}

.mobileNavContainer2 .layout{
  width: 95%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-bottom: 3em;
}

.navElement{
  height: 100px;
  padding: 1em;
}

.navElement > div{
  height: 100%;
  cursor: pointer;
  padding: 0.25em;

  text-align: center;
}

.navElement > div:hover{
  background: rgb(253,29,29);
	background: linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%);
}

.navElement > div > i{
  width: 100%;
  font-size: 3em;
}

.navElement > div > span{
  width: 100%;
}

@media screen and (min-width: 350px) {

  .navElement{
    padding: 2.5em;
    height: 150px;
  }

  .navElement > div{
    padding: 0.5em;
  }
  
}

@media screen and (min-width: 600px) {
  #mobileNavCard{
    min-height: initial;
    height: 100%;
  }

	.mobileNavContainer1 .layout{
    width: 95%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .mobileNavContainer2 .layout{
    width: 95%;
  }

  .navElement{
    padding: 2.5em;
    height: 200px;
  }

  .navElement > div{
    padding: 1.5em;
  }

  .navElement > div > i{
    font-size: 4em;
  }
  
}

@media screen and (min-width: 960px) {

	.mobileNavContainer1 .layout{
    width: 80%;
  }

  .mobileNavContainer2 .layout{
    width: 80%;
  }
  
}

.signUp{
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em 0em 1em 0em;
  background-color: #151832;
  cursor: pointer;
}

.signUp:hover{
  background: rgb(253,29,29);
	background: linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%);
}

.signUp span{
  font-size: 1.3em;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
