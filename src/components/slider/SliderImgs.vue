<template>
  <div class="slider-img-contain">
      <img class="scoped-img"
        v-bind:src="`${url}${imgData.id}/${showNow}${filesExtension}`"
        alt="pict"

        v-if="isDesktop"

        @mouseenter="stopAutoFlipping"
        @mouseleave="startAutoFlipping"
      >

      <img class="scoped-img"
        v-bind:src="`${url}${imgData.id}/${showNow}${filesExtension}`"
        alt="pict"

        v-if="!isDesktop"

        @click="toggleFlipping"
      >
      
      <div class="small-imgs-contain">
        <img class="left controls"
         :src="'./img/sliderControl/left.png'"
         alt="pict"
         @click="back()"
        >
        
        <SmallImg
          v-for="i in imgData.lng"
          :key="i"
          :id="i"
          :imgPath="url + imgData.id + '/'"
          :isActive="i === activeImg"
          @openIt="openIt"
        />
        
        <img class="right controls"
         :src="'./img/sliderControl/right.png'"
         alt="pict"
         @click="go()"
        >
      </div>
  </div>
</template>

<script>
import SmallImg from './SmallImg.vue';

export default {
 name: 'Sliderimgs',
 components: {
   SmallImg
 },
 props: ["imgData"],
 data(){
   return {
     showNow: 1,
     activeImg: 1,
     url: './img/',
     filesExtension: '.jpg',
     timer: 0,
     flipSecTime: 5,
     flippingOn: true,
     isDesktop: true
   }
 },
 mounted() {
    this.showNow = 1;
    this.activeImg = 1;
    this.startAutoFlipping();

    this.isDesktop = !( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) );
  },
 methods: {
   toggleFlipping(){
     this.flippingOn = !this.flippingOn;
     this.flippingOn ? this.startAutoFlipping() : this.stopAutoFlipping()
   },
   startAutoFlipping(){
    this.timer = setInterval( () => {
      this.go();
    }, this.flipSecTime*1000 );
   },
   stopAutoFlipping(){
     clearInterval( this.timer );
   },
   go(){
      if( this.showNow >= this.imgData.lng ){
        this.showNow = 1
      } else {
        this.showNow++;
      }
      this.activeImg = this.showNow;
    },

   back(){
    if( this.showNow <= 1 ){
      this.showNow = this.imgData.lng
    } else {
      this.showNow--;
    }
    this.activeImg = this.showNow;
   },
    openIt( id = 1 ){
      this.activeImg = id;
      this.showNow = id;
      this.stopAutoFlipping();
      this.startAutoFlipping();
    }
  }
}
</script>

<style>

  .slider-img-contain {
    width: 75%;
    height: 100%;
  }

  .controls {
    width: 600px;
    margin-left: 6.5%;
    display: flex;
    margin-top: -8.8%;
    margin-bottom: 3%;
    justify-content: space-between;
  }

  .controls > *:hover {
    cursor: pointer;
  }

  .right:hover, .left:hover {
    transition: 0.5s;
    opacity: 1;
  }

  .scoped-img {
    width: 80%;
    height: 75%;
    margin-left: 10%;
    margin-top: 2%;
  }

  .small-imgs-contain {
    display: flex;
    width: 70%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }

  .small-imgs-contain > img {
    width: 25%;
    margin: 4px;
  }

  .small-imgs-contain > img.controls {
    width: 4%;
    margin: 2.5% 0;
    height: 30px;
  }

  .small-img {
    position: relative;
    margin-left: 8px;
    margin-bottom: 8px;

    transition: 0.5s;
    border: 1px solid transparent;
  }
  .small-img:hover {
      cursor: pointer;
  }
  .active {
    transition: 0.5s;
    border: 1px solid gray;
  }

  @media ( max-device-width: 650px ) and ( orientation: portrait ) {
    .scoped-img {
      width: 100%;
      margin: 0px;
    }
    .slider-img-contain {
      width: 90%;
      margin: 0 auto;
    }
  }

  @media ( max-device-width: 1000px ){
    .controls {
      display: none;
    }
  }
</style>