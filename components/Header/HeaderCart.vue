<template>
  <div class="header-cart" data-test="open-cart" @click="$emit('open-cart')">
    <div class="header-cart__total-price">
      ${{ cartStore.CART_TOTAL_PRICE }}
    </div>
    <div class="header-cart__count">
      <img :src="image('/cart/cart.svg')" alt="cart" />
      <p>
        {{ cartStore.CART_LENGTH }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();

// const cartItemsCount = computed(() => cartStore.CART_LENGTH);
// const totalPrice = computed(() => cartStore.CART_TOTAL_PRICE);

const $emit = defineEmits(['open-cart']);
</script>

<style lang="scss" scoped>
.header-cart {
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  &__total-price {
    @include font-sm;
    font-weight: $font-weight-bold;
    color: $font-color-cta;
    font-weight: 900;
    font-size: 14px;
    letter-spacing: 5.4px;
  }

  &__count {
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.45em;
    position: relative;
    color: $font-color-black;
    margin-top: -5px;

    img {
      width: 24px;
      height: 27px;
    }

    p {
      position: absolute;
      bottom: 0px;
      left: 18px;
    }
  }
}
</style>
