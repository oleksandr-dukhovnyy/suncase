<template>
  <section class="f-screen">
    <div
      class="f-screen__item"
      v-for="(section, i) in sections"
      :key="i"
      :class="`f-screen__item--${i}`"
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
        <TheButton size="md" type="cta" @click="browse"> browse </TheButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import scrollToGoods from '@/js/scrollToGoods.js';
const getPathToImgs = (index) => `LineSlider/1/${index}.jpg`;

const sections = [
  { type: 'img', url: getPathToImgs(1) },
  {
    type: 'text',
  },
  { type: 'img', url: getPathToImgs(2) },
  { type: 'img', url: getPathToImgs(3) },
];

const browse = () => {
  scrollToGoods();
};
</script>

<style lang="scss" scoped>
$img-size-sm: 276px;
$img-size-md: 226px;
$img-size-xl: 276px;

.f-screen {
  display: grid;
  grid-gap: padding(4);
  grid-template-rows: auto;
  justify-content: center;

  @include _media-up(sm) {
    grid-template-columns: repeat(2, $img-size-sm);
  }

  @include _media-up(md) {
    grid-template-columns: repeat(3, $img-size-md);
  }

  @include _media-up(xl) {
    grid-template-columns: repeat(4, $img-size-xl);
  }

  &__item {
    height: 530px;

    width: $img-size-sm;

    @include _media-up(md) {
      width: $img-size-md;
    }

    @include _media-up(xl) {
      width: $img-size-xl;
    }

    &-img {
      height: 530px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: auto 100%;
    }

    &-cta-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      gap: padding(5);

      strong {
        @include font-lg;
        text-transform: uppercase;
        font-weight: $font-weight-light;
        letter-spacing: $font-letter-spacing-md;
      }
    }

    &--0 {
      order: 2;

      @include _media-up(sm) {
        order: 1;
      }
    }
    &--1 {
      order: 1;

      @include _media-up(sm) {
        order: 2;
      }
    }

    &--2 {
      display: none;
      order: 3;

      @include _media-up(md) {
        display: block;
      }
    }
    &--3 {
      display: none;
      order: 4;

      @include _media-up(xl) {
        display: block;
      }
    }
  }
}
</style>
