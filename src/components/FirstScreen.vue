<template>
  <section class="f-screen" style="display: none">
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
        <button>browse</button>
      </div>
    </div>
  </section>
</template>

<script setup>
const getPathToImgs = (index) => `LineSlider/1/${index}.jpg`;

const sections = [
  { type: 'img', url: getPathToImgs(1) },
  {
    type: 'text',
  },
  { type: 'img', url: getPathToImgs(2) },
  { type: 'img', url: getPathToImgs(3) },
];
</script>

<style lang="scss" scoped>
$img-size-sm: 276px;
$img-size-xl: 276px;

.f-screen {
  display: grid;
  grid-gap: padding(4);
  grid-template-rows: auto;

  @include _media-up(xl) {
    grid-template-columns: repeat(4, $img-size-xl);
  }

  &__item {
    &-img {
      width: $img-size-xl;
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

      strong {
        @include font-base;
        text-transform: uppercase;
        font-weight: 200;
        letter-spacing: $font-letter-spacing-md;
      }
    }

    &--0 {
      order: 2;
    }
    &--1 {
      order: 1;
    }
    &--2 {
      display: none;
    }
    &--3 {
      display: none;
    }
  }
}
</style>
