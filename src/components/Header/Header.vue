<template>
  <header>
    <div
      class="contacts animate__animated animate__fadeInLeft"
      @click="scrollToTop"
    >
      <p>
        <span class="contacts__phone">{{ phone }}</span>
        <span class="contacts__city"> Kyiv </span>
      </p>
    </div>
    <div class="left-group animate__animated animate__fadeInRight">
      <HeaderLagns @change-current-lang="changeCurrentLang" />
      <HeaderCart @open-cart="$store.dispatch('cart/SHOW_CART')" />
    </div>
    <Cart v-if="show" @close="$store.dispatch('cart/HIDE_CART')" />
  </header>
</template>

<script setup>
import HeaderLagns from './HeaderLagns.vue';
import HeaderCart from './HeaderCart.vue';
import Cart from './Cart/Cart.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const $store = useStore();

const show = computed(() => $store.getters['cart/SHOW_CART_POPUP']);

const scrollToTop = () => {
  self.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const changeCurrentLang = (newLang) => {
  console.log('changeCurrentLang', newLang);
};
</script>

<style lang="scss" scoped>
header {
  @include container;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: $header-height;
  background-color: #fff;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  top: 0;
  gap: padding(2);
  padding: 0 padding(2) padding(2);
  z-index: 1;

  @include _media-up(md) {
    flex-direction: row;
    height: $header-height-md;
  }

  @include _media-up(xxl) {
    padding: 0;
  }

  .contacts {
    // height: $header-height;
    padding-top: padding(2);
    display: flex;
    align-items: center;
    cursor: pointer;

    @include _media-up(md) {
      height: $header-height-md;
    }

    p {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
    }

    &__phone {
      @include font-base;

      font-weight: $font-weight-light;
    }

    &__city {
      @include font-sm;
      text-transform: uppercase;
      color: $font-color-muted;
    }
  }

  .left-group {
    display: flex;
    gap: padding(4);
    width: 100%;
    justify-content: space-evenly;

    @include _media-up(md) {
      width: max-content;
      // gap: unset;
      justify-content: unset;
    }
  }
}
</style>
