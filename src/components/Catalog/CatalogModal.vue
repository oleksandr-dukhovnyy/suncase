<template>
  <Modal v-if="show" @close="closeSlider">
    <div class="catalog-modal">
      <div class="catalog-modal__slider">
        <img
          class="catalog-modal__selected-img"
          :src="image(`${selected.item.id}/${selectedID}.jpg`)"
          alt="glasses"
        />
        <div class="catalog-modal__slider-contain">
          <div class="catalog-modal__nav-arrow-contain" @click="moveBack">
            <img
              class="catalog-modal__nav-arrow"
              :src="icon('back')"
              alt="back"
            />
          </div>
          <img
            v-for="i in selected.item.lng"
            class="catalog-modal__slider-img"
            :class="{
              [`catalog-modal__slider-img--selected`]: i === selectedID,
            }"
            :src="image(`${selected.item.id}/${i}.jpg`)"
            @click="selectedID = i"
            alt="glasses"
          />
          <div class="catalog-modal__nav-arrow-contain" @click="moveForward">
            <img
              class="catalog-modal__nav-arrow"
              :src="icon('forward')"
              alt="forward"
            />
          </div>
        </div>
      </div>
      <div class="catalog-modal__controls">
        <div class="catalog-modal__info">
          <ProductCard
            :title="selected.item.brend"
            :model="selected.item.model"
            :coast="selected.item.coast"
            :sale="selected.item.sale"
            :old-coast="selected.item.oldCoast"
            :is-new="selected.item.isNew"
            :id="selected.item.id"
            :use-image="false"
            :use-counter="true"
            :count="count"
            @inc-count="count++"
            @dec-count="count--"
          />
        </div>
        <div
          class="catalog-modal__actions"
          :class="{
            'catalog-modal__actions--large-icon': showAddToCartAnimation,
          }"
        >
          <TheButton size="lg" type="error" @click="buy"> buy </TheButton>
          <TheButton
            size="lg"
            type="black"
            :icon-name="showAddToCartAnimation ? 'ok' : 'plus'"
            :icon-size="showAddToCartAnimation ? 20 : 11"
            @click="addToCart"
          >
            <span
              v-if="!showAddToCartAnimation"
              style="margin: auto 0 auto 8px"
            >
              to cart
            </span>
          </TheButton>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import ProductCard from '../General/ProductCard.vue';
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

// vars
const $store = useStore();
const selected = computed(() => $store.getters['slider/SELECTED_ITEM']);
const show = computed(
  () => $store.getters['slider/SLIDER_SHOW'] && selected.value.defined
);
const selectedID = ref(1);
const showAddToCartAnimation = ref(false);
const count = ref(1);
const resetCounter = () => (count.value = 1);
// /vars

// watchers
watch(show, () => (selectedID.value = 1));
// /watchers

// methods
const moveForward = () => {
  if (!selected.value.defined) return;

  if (selectedID.value + 1 > selected.value.item.lng) {
    return (selectedID.value = 1);
  }

  selectedID.value++;
};

const moveBack = () => {
  if (!selected.value.defined) return;

  if (selectedID.value - 1 < 1) {
    return (selectedID.value = selected.value.item.lng);
  }

  selectedID.value--;
};

const addToCart = () => {
  showAddToCartAnimation.value = true;
  $store.dispatch('cart/ADD_TO_CART', {
    id: selected.value.item.id,
    count: count.value,
    overflow: 'cut',
  });

  setTimeout(() => {
    showAddToCartAnimation.value = false;
  }, 860);
};

const buy = () => {
  $store.dispatch('slider/BUY_IT', selected.value.item.id);
};

const closeSlider = () => {
  resetCounter();
  $store.dispatch('slider/HIDE_SLIDER');
};

// /methods

// other
setInterval(moveForward, import.meta.env.MODE === 'development' ? 7000 : 3000);
</script>

<style scoped lang="scss">
.catalog-modal {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 400px 1fr;

  height: calc(100% - 30px);
  padding: 30px 0;

  @include media-up(md) {
    grid-template-columns: 1fr 250px;
    // grid-template-rows: 440px 1fr;
    grid-template-rows: 1fr;
  }

  @include media-down-landscape(lg) {
    padding: 0;
  }

  @include media-down-portrait(lg) {
    grid-template-rows: 350px 1fr;
  }

  &__slider {
    max-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include media-up(md) {
      height: calc(80vh - padding(8));
    }

    @include media-down-landscape(lg) {
      height: calc(70vh - padding(8));
    }
  }

  &__new-coast {
    color: $font-color-red;
  }

  &__price {
    color: $font-color-cta;
    display: flex;
    gap: 10px;
    margin-bottom: padding();

    @include media-up(xl) {
      font-size: 14px;
    }
  }

  &__sale {
    color: $font-color-cta;
    text-decoration: line-through;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    margin-top: padding(2);
    gap: padding();
    justify-content: center;

    img {
      width: 11px;
      height: 11px;
    }

    &--large-icon {
      button img {
        width: 20px;
        height: 20px;
      }
    }

    button > span {
      display: block;
      padding-top: 4px;
    }
  }

  &__controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__selected-img {
    margin: 0 auto;
    width: 100%;

    @include media-up(md) {
      width: 75%;
    }

    @include media-down-landscape(lg) {
      width: 65%;
    }
  }

  &__slider-img {
    width: 100px;
    border: 1px solid transparent;
    transition: 300ms;
    cursor: pointer;

    @include media-up(md) {
      width: 80px;
    }

    @include media-up(lg) {
      width: 85px;
    }

    @include media-up(xl) {
      width: 120px;
    }

    @include media-down-landscape(lg) {
      width: 65px;
    }

    &--selected {
      transition: 300ms;
      border-color: $color-muted;
    }
  }

  &__nav-arrow {
    $size: 50px;

    width: $size;
    height: $size;

    cursor: pointer;

    &-contain {
      display: none;
      align-items: center;

      @include media-up(lg) {
        display: flex;
      }
    }
  }

  &__slider-contain {
    display: grid;
    gap: padding(2);
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row;

    @include media-up(lg) {
      gap: padding();
      grid-template-rows: 1fr;
      grid-template-columns: none;
      grid-auto-flow: column;
    }

    @include media-up(xl) {
      gap: padding(2);
      grid-template-rows: 1fr;
      grid-template-columns: none;
      grid-auto-flow: column;
    }

    @include media-down-landscape(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
