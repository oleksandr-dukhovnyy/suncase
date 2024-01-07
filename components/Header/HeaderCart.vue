<template>
  <div class="header-cart" data-test="open-cart" @click="emit('open-cart')">
    <div class="header-cart__total-price" data-test="cart-total-price">
      ${{ cartStore.CART_TOTAL_PRICE }}
    </div>
    <div class="header-cart__count">
      <img :src="image('cart/cart.svg')" alt="cart" />
      <p data-test="cart-length">
        {{ cartStore.CART_LENGTH }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '~/store/cart';

const emit = defineEmits<{
  (e: 'open-cart'): void;
}>();

const { t } = useLocator();
const cartStore = useCartStore();
</script>

<style lang="scss" scoped>
.header-cart {
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  &__total-price {
    color: $color-cta;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 5.4px;
  }

  &__count {
    position: relative;
    margin-top: -5px;
    color: $color-black;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.45em;

    img {
      width: 24px;
      height: 27px;
    }

    p {
      position: absolute;
      bottom: 0;
      left: 18px;
    }
  }
}
</style>
