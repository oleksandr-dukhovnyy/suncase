<template>
  <div class="f-screen">
    <div class="f-screen__slider-controlls">
      <img
        @click="moveSlider(false)"
        src="../../public/img/icons/back.svg"
        alt="forward"
      />
    </div>
    <swiper-container
      ref="slider"
      loop="true"
      slides-per-view="4"
      space-between="30"
      class="f-screen__slider"
      style="width: 100%"
    >
      <swiper-slide
        class="f-screen__item"
        v-for="(section, i) in sections"
        :key="i"
        :class="`f-screen__item--${i}`"
        :style="{
          width: i % 2 ? '326px' : '276px',
        }"
        :breakpoints="breakpoints"
      >
        <div
          v-if="section.type === 'img'"
          :style="`background-image: url(${image(section.url)})`"
          alt="peoples in sunglasses pictures"
          class="f-screen__item-img"
        ></div>
        <div class="f-screen__item-cta-text" v-else>
          <strong>
            sunglasses <br />
            for all <br />
            life <br />
            seasons
          </strong>
          <TheButton size="lg" type="cta" @click="scrollToGoods">
            browse
          </TheButton>
        </div>
      </swiper-slide>
    </swiper-container>
    <div class="f-screen__slider-controlls">
      <img
        @click="moveSlider(true)"
        src="../../public/img/icons/forward.svg"
        alt="forward"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import scrollToGoods from '@/js/scrollToGoods.js';
const getPathToImgs = (index) => `LineSlider/1/${index}.jpg`;

const sections = [
  { type: 'img', url: getPathToImgs(1) },
  {
    type: 'text',
  },
  { type: 'img', url: getPathToImgs(2) },
  { type: 'img', url: getPathToImgs(3) },

  { type: 'img', url: getPathToImgs(1) },
  {
    type: 'text',
  },
  { type: 'img', url: getPathToImgs(2) },
  { type: 'img', url: getPathToImgs(3) },
];

const slider = ref();

let moveSlider = () => {};

const breakpoints = {
  1250: {
    slidesPerView: 3,
  },
};

onMounted(() => {
  moveSlider = (goForvard = true) =>
    slider.value.swiper[`slide${goForvard ? 'Next' : 'Prev'}`]();
});

/*

function loop (times) {
  // use context

  for (let i = 0; i < times; i++) {
    context.call({ index: i });
  }
}

loop(5) {
  console.log(context.index);
}

// ===========

function loop (times, callback) {
  // use context

  for (let i = 0; i < times; i++) {
    callback.call({ index: i });
  }
}

loop(5, function {
  console.log(this.index);
});

*/
</script>

<style lang="scss" scoped>
$img-size: 276px;
$img-size-2nth: 326px;

.f-screen {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 30px;
  width: 100%;

  &__slider {
    display: grid;
    grid-gap: padding(4);
    grid-template-rows: auto;
    // justify-content: center;
    gap: 30px;
    grid-template-columns: 1fr;

    &-controlls {
      display: flex;
      align-items: center;

      img {
        width: 48px;
        height: 48px;
        cursor: pointer;
      }
    }

    @include media-up(smx) {
      grid-template-columns: $img-size-2nth;
    }

    @include media-up(xsm) {
      grid-template-columns: $img-size $img-size-2nth;
    }

    @include media-up(xlg) {
      grid-template-columns: $img-size $img-size-2nth $img-size;
    }

    @include media-up(xxl) {
      grid-template-columns: $img-size $img-size-2nth $img-size $img-size-2nth;
    }
  }

  &__item {
    height: 530px;
    width: 100%;

    &-img {
      height: 530px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: auto 100%;
    }

    &-cta-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 215px;
      height: 100%;
      gap: 20px;
      margin: 0 auto;

      strong {
        text-transform: uppercase;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: 0.45em;
        font-weight: 400;
      }

      button {
        font-size: 12px;
        letter-spacing: 0.45em;
        font-weight: 400;
      }
    }

    &--0 {
      order: 2;

      @include media-down(sm) {
        order: 1;
      }
    }

    &--1 {
      order: 1;
      margin: 0 auto;

      @include media-up(sm) {
        order: 2;
      }
    }

    &--2 {
      display: none;
      order: 3;

      @include media-up(xlg) {
        display: block;
      }
    }

    &--3 {
      display: none;
      order: 4;

      @include media-up(xxl) {
        display: block;
      }
    }
  }
}
</style>
