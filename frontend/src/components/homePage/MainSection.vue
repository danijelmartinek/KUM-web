<template>
    <div>
        <div class="landing_img_container">
            <v-img class="landing_img" :src="require('@/assets/img/kz.png')" aspect-ratio="1.7">
                <img class="kum_logo" src="@/assets/img/kum_logo_animation.gif" alt="kum_logo">
                <carousel 
                    class="jobs" 
                    :loop="true" 
                    :dots="false" 
                    :nav="false" 
                    :autoplay="false"
                    :autoplayTimeout="4000"
                    :responsive="{0:{items:2,nav:false},600:{items:3,nav:false},900:{items:4,nav:false}, 1200:{items:5,nav:false}}"
                >
                    <a href="#section_two"><div :style="{ 'background-image': 'url(' + image1 + ')' }" style="background-size: auto 20vh;">Sport</div></a>
                    <div :style="{ 'background-image': 'url(' + image2 + ')' }" style="background-size: auto 20vh;">Zabave</div>
                    <div :style="{ 'background-image': 'url(' + image3 + ')' }" style="background-size: auto 20vh;">Volontiranje</div>
                    <div :style="{ 'background-image': 'url(' + image4 + ')' }" style="background-size: auto 20vh;">Obrazovanje</div>
                    <div :style="{ 'background-image': 'url(' + image5 + ')' }" style="background-size: auto 20vh;">Sajmovi</div>
                </carousel>

                <div class="mask">
                    <svg style="display: block;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1925 508">
                        <path fill="#fff" class="cls-1" d="M-2.5,492.5c1813,4,1924-493,1924-493v503H-2.5Z" transform="translate(3 5)"/>
                    </svg>
                </div>
            </v-img>
        </div>
    </div>
</template>

<script>
import carousel from 'v-owl-carousel'

export default {
	data: () => ({
        image1: "https://images.unsplash.com/photo-1519046947096-f43d6481532b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        image2: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        image3: "https://images.unsplash.com/photo-1534750554350-5d579939db38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        image4: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        image5: "https://images.unsplash.com/photo-1499793527052-7c9b2e6ce569?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1348&q=80",
	}),
	
    name: 'Sidebar',
    components: {
        carousel
    }
}
</script>

<style scoped>
.landing_img_container{
    width: 100vw;
}
.landing_img{
    height: 80vh;
    position: relative;
}
.kum_logo{
    position: relative;
    top: 40%;
    transform: translateY(-50%);
    width: 60vw;
    display: block;
    margin: 0 auto;
}

@media only screen and (min-width: 600px) {
  .kum_logo{
    width: 40vw;
  }
}

@media only screen and (min-width: 1200px) {
  .kum_logo{
    width: 20vw;
  }
}

.jobs{
    position: absolute;
    width: 100%;
    bottom: 0;
}
.jobs:hover{
    cursor: grab;
}
.jobs div{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVQYV2NkQAW+jEh8XwYGhs0wATAHJAkSgHNAAgBWLgNSw1NfCAAAAABJRU5ErkJggg==) repeat;
    height: 15vh;
    border-left: 0.5em solid #8C2927;
    margin: 1.5em;
    border-radius: 1em;

    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    line-height: 15vh;
}
.mask {
    pointer-events: none;
    position: absolute;
    width: 100%;
    bottom: -1px;
    z-index: 999;
}
</style>
