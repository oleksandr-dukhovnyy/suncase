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

<script setup>
import { useStore } from 'vuex';
import scrollToGoods from '@/js-utils/scrollToGoods.js';

const $store = useStore();

const navItems = ['man', 'woman', 'kids'];

const selectCategory = (category) => {
  $store.dispatch('glasses/TOGGLE_FILTER_GENDERS', category);
  scrollToGoods();
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: column;
  column-gap: padding(4);

  @include media-up(md) {
    justify-content: center;
    flex-direction: row;
  }

  @include media-up(xl) {
    padding: 30px;
  }

  span {
    text-align: center;
    color: $font-color-cta;
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
