<template>
  <div class="header-cart" @click="$emit('open-cart')">
    <div class="header-cart__total-price">${{ totalPrice }}</div>
    <div class="header-cart__count">
      <img :src="image('/cart/cartIcon.jpg')" alt="cart" />
      <p>
        {{ cartItemsCount }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const $state = useStore();

const cartItemsCount = computed(() => $state.getters['cart/CART_LENGTH']);
const totalPrice = computed(() => $state.getters['cart/CART_TOTAL_PRICE']);

const $emit = defineEmits(['open-cart']);
</script>

<style lang="scss" scoped>
.header-cart {
  display: flex;
  gap: padding(1);
  align-items: center;
  cursor: pointer;

  &__total-price {
    @include font-sm;
    font-weight: $font-weight-bold;
    color: $font-color-cta;
    font-weight: 900;
    font-size: $font-size-xxsm - 1;
    letter-spacing: 0.45em;
  }

  &__count {
    font-weight: 600;
    font-size: 10px;
    letter-spacing: 0.45em;
    position: relative;
    color: $font-color-black;

    p {
      position: absolute;
      bottom: 0px;
      left: 14px;
    }
  }
}
</style>
