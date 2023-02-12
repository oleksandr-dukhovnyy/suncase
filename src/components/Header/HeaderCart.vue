<template>
  <div class="cart" @click="$emit('open-cart')">
    <div class="cart__total-price">${{ totalPrice }}</div>
    <div class="cart__count">
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
.cart {
  display: flex;
  gap: padding(1);
  align-items: center;

  &__total-price {
    @include font-sm;
    font-weight: $font-weight-bold;
    color: $font-color-cta;
  }

  &__count {
    @include font-xsm;
    position: relative;
    color: $font-color-black;

    p {
      position: absolute;
      bottom: -4px;
      left: 14px;
    }
  }
}
</style>
