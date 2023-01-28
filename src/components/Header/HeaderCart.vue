<template>
  <div class="cart">
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
const totalPrice = 123;
const cartItemsCount = 2;
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  gap: padding(1);
  align-items: center;

  &__total-price {
    @include font-sm;
    font-weight: 600;
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
