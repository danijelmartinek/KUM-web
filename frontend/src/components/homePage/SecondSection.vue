<template>
    <div id="section_two">
        <div class="image_part">
            <v-img class="sport_img" :src="require('@/assets/img/kz.png')" aspect-ratio="1.7">
                <img class="mask" :src="require('@/assets/img/sport_mask.png')">
            </v-img>
        </div>
        <div class="info_part">
            <h1><b style="color: #C21A00; font-size: 2em;">¬</b> SPORT</h1>
            <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
             <v-expansion-panel>
                <v-expansion-panel-content>
                <div slot="header">Popis sportskih događaja</div>
                <v-list dense class="pt-0">
                <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                >
                    <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'ESPR ljetni turnir iz odbojke', icon: 'dashboard' },
          { title: 'Fatamorgana - odbojka na pjesku', icon: 'question_answer' },
          { title: 'Fatamorgana - nogomet na pjesku', icon: 'question_answer' }
        ],
        right: null
      }
    }
  }
</script>

<style scoped>
#section_two{
    position: absolute;
    width: 100%;
    background-color: #fff;
    border-left: 0.5em solid #C21A00;
    padding: 2em;
}

@media only screen and (min-width: 1200px) {
    #section_two{
        padding: 8em;
    }
}

.image_part{
    float: left;
    width: 100%;
}

.info_part{
    float: left;
    width: 100%;
    color: black;
    padding: 2em;
}

.info_part h1{
    font-family: 'Halant', serif;
}

.info_part p{
    font-family: 'Nunito Sans', sans-serif;
}

@media only screen and (min-width: 800px) {
    .image_part{
        width: 50%;
    }

    .info_part{
        width: 50%;
        padding: 0em;
    }
}

.sport_img{
    width: 100%;
    height: 100%;
}

.mask{
    margin-top: -0.5%;
    margin-left: -0.5%;
    width: 102%;
    height: 102%;
}
</style>
