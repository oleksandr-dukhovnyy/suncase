<template>
  <nav class="nav">
    <span
      v-for="navItem in navItems"
      :key="navItem"
      @click="selectCategory(navItem)"
    >
      {{ navItem }}
    </span>
  </nav>
</template>

<script lang="ts" setup>
import { scrollToGoods } from '~/helpers/scrollToGoods';
import { useGlassesStore } from '~/store/glasses';

const glassesStore = useGlassesStore();

const navItems = ['man', 'woman', 'kids'];

const selectCategory = (category: string) => {
  glassesStore.TOGGLE_FILTER_GENDERS(category);
  scrollToGoods();
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: column;
  column-gap: padding(4);

  $magic-offset: 28px;
  margin-top: $magic-offset * -1;
  padding-bottom: $magic-offset;

  @include media-up(md) {
    justify-content: center;
    flex-direction: row;
  }

  @include media-up(xlg) {
    margin-top: 0;
    padding-bottom: 0;
    padding: 0 30px 90px;
  }

  span {
    text-align: center;
    color: $color-cta;
    text-transform: uppercase;
    padding: 0 padding(2) padding(3);
    font-weight: 900;
    letter-spacing: 0.5em;
    cursor: pointer;
    font-size: 15px;

    @include media-up(md) {
      padding: 30px padding(2);
    }

    @include media-up(xl) {
      padding: 0 16px;
    }
  }
}
</style>
