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
          :key="item.id"
          :title="item.brend"
          :model="item.model"
          :coast="item.coast"
          :sale="item.sale"
          :old-coast="item.oldCoast"
          :is-new="item.isNew"
          :id="item.id"
          :count="item.count"
          :use-remove-bttn="true"
          :use-counter="true"
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
import Modal from '../../General/Modal.vue';
import HeaderCart from '../HeaderCart.vue';
// import CartItem from './CartItem.vue';
import ProductCard from '../../General/ProductCard.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import scrollToGoods from '@/js/scrollToGoods.js';

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
  grid-template-rows: 1fr;
  padding-top: 108px;

  @include media-up(sm) {
    // padding-top: 83px;
    padding-top: 93px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: padding(2);
    align-items: center;
    z-index: 11;
    position: fixed;
    background-color: #fff;
    left: 30px;
    width: calc(100% - 60px);
    justify-content: center;
    // margin-top: -3px;
    padding-bottom: 30px;

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
    grid-template-columns: 200px 200px;
    justify-items: center;
    // column-gap: 30px;
    justify-content: space-evenly;
    row-gap: 50px;

    @include media-up(sm) {
      grid-template-columns: repeat(3, 200px);
      // row-gap: padding(6);
    }

    @include media-up(xl) {
      grid-template-columns: repeat(4, 200px);
    }
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
