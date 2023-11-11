<template>
  <Modal @close="$emit('close')">
    <div class="cart">
      <div class="cart__price">
        <HeaderCart />
        <TheButton size="lg" type="error-filled" @click="buy"> buy </TheButton>
      </div>
      <div v-if="CART_ITEMS.length > 0" class="cart__list">
        <ProductCard
          v-for="item in CART_ITEMS"
          v-bind="item"
          use-remove-btn
          use-counter
          @clicked="openInPopup(item.id)"
          @inc-count="incCount(item.id)"
          @dec-count="decCount(item.id)"
          @remove="remove(item.id)"
        />
        <!-- @counter-change="(count) => counterChange(item.id, count)" -->
      </div>
      <div v-else class="cart__empty">
        <!-- https://undraw.co/search -> "empty" -->
        <img
          class="animate__animated animate__zoomIn"
          :src="icon('empty-cart')"
          alt="empty cart"
        />
        <p>Cart is currently empty</p>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import HeaderCart from '../HeaderCart.vue';
// import TheButton from '~/components/General/TheButton.vue';
// import CartItem from './CartItem.vue';
// import Modal from '~/components/General/Modal.vue';
// import ProductCard from '../../General/ProductCard.vue';
import { useStore } from 'vuex';
import scrollToGoods from '@/js-utils/scrollToGoods.js';

const $state = useStore();

const CART_ITEMS = computed(() => $state.getters['cart/CART']);

const openInPopup = (id) => {
  $state.dispatch('slider/SET_SELECTED', id);
  $state.dispatch('slider/SHOW_SLIDER');
};

const incCount = (id) => $state.dispatch('cart/INC_ITEM_COUNT', id);
const decCount = (id) => $state.dispatch('cart/DEC_ITEM_COUNT', id);

const remove = (id) => {
  $state.dispatch('cart/DELETE_ITEM', id);
};

const $emit = defineEmits(['close']);

const buy = () => {
  if (CART_ITEMS.value.length > 0) {
    $state.dispatch('cart/BUY_ALL');
  } else {
    $state.dispatch('cart/HIDE_CART');
    scrollToGoods();
  }
};
</script>

<style lang="scss" scoped>
.cart {
  display: grid;
  gap: padding(2);
  grid-template-columns: 1fr;
  padding-top: 110px;
  height: 100%;
  max-height: 920px;
  overflow-y: auto;

  @include media-up(sm) {
    margin-top: 75px;
    padding-top: 0;
    max-height: 620px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: padding(2);
    align-items: center;
    z-index: 11;
    position: absolute;
    background-color: #fff;
    justify-content: center;
    padding-bottom: 30px;
    top: 0;
    width: 100%;

    @include media-up(sm) {
      flex-direction: row;
      gap: 50px;
    }

    @include media-down-landscape(lg) {
      padding-bottom: 16px;
      margin-top: -16px;
    }
  }

  &__list {
    display: grid;
    gap: 50px;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 200px);
  }

  &__empty {
    @include font-lg;
    width: 100%;
    height: 400px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: padding(6);

    color: $font-color-muted;

    img {
      height: 150px;

      @include media-up(xl) {
        height: 273px;
      }
    }

    @include media-down-landscape(xl) {
      flex-direction: row;
      height: 200px;

      img {
        height: 100px;
      }
    }
  }
}
</style>