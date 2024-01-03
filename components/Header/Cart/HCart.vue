<template>
  <Modal @close="emit('close')">
    <div class="cart" data-test="cart">
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
      </div>
      <div v-else class="cart__empty">
        <p>Cart is currently empty</p>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { scrollToGoods } from '~/helpers/scrollToGoods';
import { useCartStore } from '~/store/cart';
import { useSliderStore } from '~/store/slider';
import HeaderCart from '~/components/Header/HeaderCart.vue';

const cartStore = useCartStore();
const sliderStore = useSliderStore();

const CART_ITEMS = computed(() => cartStore.CART);

const openInPopup = (id: Glasses.Item['id']) => {
  sliderStore.SET_SELECTED(id);
  sliderStore.SHOW_SLIDER();
};

const incCount = (id: Glasses.Item['id']) => cartStore.INC_ITEM_COUNT(id);
const decCount = (id: Glasses.Item['id']) => cartStore.DEC_ITEM_COUNT(id);
const remove = (id: Glasses.Item['id']) => cartStore.DELETE_ITEM(id);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const buy = () => {
  if (CART_ITEMS.value.length > 0) {
    cartStore.BUY_ALL();
  } else {
    cartStore.HIDE_CART();
    scrollToGoods();
  }
};
</script>

<style lang="scss" scoped>
.cart {
  display: grid;
  grid-template-columns: 1fr;
  gap: padding(2);
  overflow-y: auto;
  height: 100%;
  max-height: 920px;
  padding-top: 110px;

  @include media-up(sm) {
    max-height: 620px;
    margin-top: 75px;
    padding-top: 0;
  }

  &__price {
    position: absolute;
    top: 0;
    z-index: 11;
    display: flex;
    flex-direction: column;
    gap: padding(2);
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 30px;
    background-color: #fff;

    @include media-up(sm) {
      flex-direction: row;
      gap: 50px;
    }

    @include media-down-landscape(lg) {
      margin-top: -16px;
      padding-bottom: 16px;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 50px;
    justify-content: center;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    gap: padding(6);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    color: $color-muted;
    font-size: 25px;

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
