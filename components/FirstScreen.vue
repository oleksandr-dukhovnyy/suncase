<template>
  <section class="f-screen">
    <div
      class="f-screen__item"
      v-for="(section, i) in sections"
      :key="i"
      :class="`f-screen__item--${i}`"
    >
      <div
        v-if="section.type === 'img' && section.url !== undefined"
        :style="`background-image: url(${section.url})`"
        alt="peoples in sunglasses pictures"
        class="f-screen__item-img"
      ></div>
      <div class="f-screen__item-cta-text" v-else>
        <strong>
          {{ t('cta.slogan.0') }} <br />
          {{ t('cta.slogan.1') }} <br />
          {{ t('cta.slogan.2') }} <br />
          {{ t('cta.slogan.3') }}
        </strong>
        <TheButton size="lg" type="cta" @click="scrollToGoods">
          {{ t('cta.action-button') }}
        </TheButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { scrollToGoods } from '~/helpers/scrollToGoods';
import image from '~/utils/image';

const { t } = useLocator();

const getPathToImgs = (index: number | string) =>
  image(`LineSlider/1/${index}.jpg`);

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
$img-size: 276px;
$img-size-2nth: 326px;

.f-screen {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  gap: padding(4);
  gap: 30px;
  justify-content: center;

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

  &__item {
    width: 100%;
    height: 530px;

    &-img {
      height: 530px;
      background-position: 50%;
      background-size: auto 100%;
      background-repeat: no-repeat;
    }

    &-cta-text {
      display: flex;
      flex-direction: column;
      gap: 30px;
      justify-content: center;
      align-items: flex-start;
      width: 215px;
      height: 100%;
      margin: 0 auto;

      strong {
        font-size: 20px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.45em;
        text-transform: uppercase;
      }

      // button {
      //   font-weight: 400;
      //   letter-spacing: 0.45em;
      // }
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
