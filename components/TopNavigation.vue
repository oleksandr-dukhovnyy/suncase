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
  $magic-offset: 28px;

  display: flex;
  flex-direction: column;
  margin-top: $magic-offset * -1;
  padding-bottom: $magic-offset;
  column-gap: padding(4);

  @include media-up(md) {
    flex-direction: row;
    justify-content: center;
  }

  @include media-up(xlg) {
    margin-top: 0;
    padding: 0 30px 90px;
  }

  span {
    padding: 0 padding(2) padding(3);
    color: $color-cta;
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 0.5em;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;

    @include media-up(md) {
      padding: 30px padding(2);
    }

    @include media-up(xl) {
      padding: 0 16px;
    }
  }
}
</style>
