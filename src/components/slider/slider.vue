<template>
  <div class="bloor-contain" @click="HIDE_SLIDER" v-if="SLIDER_SHOW">
    <div class="slider-contain-position slider-contain-content" @click.stop>
      <div class="second-close-bttn-contain">
        <img
          :src="'./img/sliderControl/closeBttn.svg'"
          alt="x"
          class="second-close-bttn _close_"
          @click="HIDE_SLIDER"
        />
      </div>

      <div class="img-contain">
        <!-- :imgData="SELECTED_ITEM.item" -->
        <SliderImgs />
      </div>
      <div class="controls-contain">
        <div class="first-close-bttn-contain">
          <img
            :src="'./img/sliderControl/closeBttn.svg'"
            alt="x"
            class="first-close-bttn _close_"
            @click="HIDE_SLIDER"
          />
        </div>
        <!-- :imgData="SELECTED_ITEM.item" -->
        <SliderInfs />
        <!-- @addToCart="addToCart" -->
        <!-- @buyIt="buyIt" -->
        <!-- :productData="SELECTED_ITEM.item" -->
        <SliderBuy />
      </div>
    </div>
  </div>
</template>

<script>
import SliderImgs from './SliderImgs.vue';
import SliderInfs from './SliderInfs.vue';
import SliderBuy from './SliderBuy.vue';
import { mapActions, mapGetters } from 'vuex';

// vuex
const vuexActions = {
  HIDE_SLIDER: 'slider/HIDE_SLIDER',
  SHOW_SLIDER: 'slider/SHOW_SLIDER',
};

const vuexGetters = {
  SLIDER_SHOW: 'slider/SLIDER_SHOW',
  SELECTED_ITEM: 'slider/SELECTED_ITEM',
};

export default {
  name: 'slider',
  components: { SliderImgs, SliderInfs, SliderBuy },
  computed: {
    ...mapGetters(vuexGetters),
  },
  methods: {
    ...mapActions(vuexActions),
    closeModal() {
      this.$emit('closeSlider');
    },
    stopPropagation(e) {
      e.stopPropagation();
    },
    addToCart(id) {
      this.$emit('addToCart', id);
    },
    buyIt(id) {
      this.$emit('buyIt', id);
    },
  },
};
</script>

<style>
._close_ {
  width: 25px !important;
  height: 25px !important;
  opacity: 0.5 !important;
}

.border {
  border: 1px solid black;
}

* {
  font-family: 'Roboto', sans-serif;
}

.slider-contain-position {
  padding-top: 10px;
  z-index: 300;
  background-color: #fff;
  max-width: 1000px;
  width: 73%;
  height: 70%;
  top: 4%;
  max-height: 550px;
  position: fixed;
  padding: 5%;

  left: auto;
  right: auto;

  -webkit-box-shadow: 0px 0px 32px -4px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 32px -4px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 32px -4px rgba(0, 0, 0, 0.75);
  opacity: 1;
}

.slider-contain-content {
  display: flex;
  flex-direction: row;
}
.slider-contain *::selection {
  background-color: transparent;
  color: orangered;
}

.slider-contain * ::selection {
  background-color: transparent;
  color: orangered;
}

.bloor-contain {
  z-index: 12;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.img-contain {
  width: 78%;
  margin: auto 0;
  justify-content: center;
  display: flex;
  margin-right: 5%;
}

.first-close-bttn-contain {
  display: flex;
  width: calc(100% - 8px);
  height: 10%;
}

.first-close-bttn {
  width: 25px;
  opacity: 0.5;
  height: 75%;
  margin-top: calc(-19% + 8px);
  margin-left: 100%;
}

.first-close-bttn:hover {
  cursor: pointer;
}

.second-close-bttn-contain {
  display: none;
  width: 100%;
  justify-content: flex-end;
}

.second-close-bttn-contain img.second-close-bttn {
  width: 25px;
  opacity: 0.6;
}

.controls-contain {
  padding: 1%;
  width: 18%;
  display: flex;
  flex-direction: column;
  width: 30%;
}

@media (orientation: portrait) {
  .second-close-bttn-contain {
    display: flex;
  }

  .slider-contain-content {
    flex-direction: column;
    justify-content: space-around;
  }

  .controls-contain {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }
  .img-contain {
    width: 100%;
    margin: 0 auto;
  }
  .close-bttn {
    opacity: 0.6;
    height: 165%;
    margin-top: -43%;
    margin-left: 112%;
  }
  .close-bttn-contain {
    width: 104%;
    justify-content: flex-end;
  }

  .close-bttn-contain > img {
    width: 25px;
    height: 25px;
    opacity: 0.6;
  }

  .first-close-bttn-contain {
    display: none;
  }
  .slider-contain-position {
    height: 75%;
    top: auto;
  }
}

@media (min-device-width: 1300px) and (orientation: portrait) {
  .slider-contain-position {
    padding: 58px;
  }
}

@media (max-device-width: 395px) and (orientation: portrait) {
  .slider-contain-content {
    justify-content: flex-start;
  }
  .controls-contain {
    flex-direction: column;
  }
}

@media (orientation: landscape) and (max-device-height: 500px) {
  .slider-contain-position {
    position: relative;
    height: 23ch;
    top: 0ch;
  }
}
</style>
