<template>
  <Modal v-if="show" @close="$store.dispatch('slider/HIDE_SLIDER')">
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
          <strong>
            {{ selected.item.brend }}
          </strong>
          <em> {{ selected.item.model }} </em>
          <div class="catalog-modal__price">
            <p :class="selected.item.sale ? 'catalog-modal__sale' : ''">
              ${{
                selected.item.sale
                  ? selected.item.oldCoast
                  : selected.item.coast
              }}
            </p>
            <p v-if="selected.item.sale" class="catalog-modal__new-coast">
              ${{ selected.item.coast }}
            </p>
          </div>
        </div>
        <div class="catalog-modal__actions">
          <TheButton size="lg" type="error" @click="buy"> buy </TheButton>
          <TheButton
            size="lg"
            type="black"
            :iconName="showAddToCartAnimation ? 'ok' : 'add'"
            @click="addToCart"
          >
            <span v-if="!showAddToCartAnimation">to cart</span>
          </TheButton>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

// import TheButton from '../General/TheButton.vue';

// vars
const $store = useStore();
const selected = computed(() => $store.getters['slider/SELECTED_ITEM']);
const show = computed(
  () => $store.getters['slider/SLIDER_SHOW'] && selected.value.defined
);
const selectedID = ref(1);
const showAddToCartAnimation = ref(false);

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
  $store.dispatch('cart/ADD_TO_CART', selected.value.item.id);

  setTimeout(() => {
    showAddToCartAnimation.value = false;
  }, 860);
};

const buy = () => {
  $store.dispatch('slider/BUY_IT', selected.value.item.id);
};

// /methods

// other
setInterval(moveForward, import.meta.env.MODE === 'development' ? 7000 : 3000);
</script>

<style scoped lang="scss">
.catalog-modal {
  display: grid;
  // gap: padding(4);

  grid-template-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 356px 1fr;

  @include _media-up(md) {
    grid-template-columns: 1fr 250px;
    grid-template-rows: 1fr;
  }

  // & > * {
  //   // outline: 1px dotted orange;
  // }

  &__slider {
    max-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include _media-up(md) {
      height: calc(80vh - padding(8));
    }
  }

  &__new-coast {
    color: $font-color-red;
    @include font-md;
  }

  &__price {
    color: $font-color-cta;
    display: flex;
    gap: padding();
    margin-bottom: padding();

    @include _media-up(xl) {
      @include font-md;
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
    align-items: center;
    justify-content: center;
  }

  &__info {
    @include font-md;
    display: flex;
    flex-direction: column;
    gap: padding();

    strong {
      @include font-base;
      letter-spacing: $font-letter-spacing-sm;
      color: $font-color-cta;
      font-weight: $font-weight-light;

      @include _media-up(xl) {
        @include font-md;
      }
    }

    em {
      @include font-sm;
      letter-spacing: $font-letter-spacing-sm;
      font-style: normal;
      color: $font-color-muted;

      &--line-through {
        text-decoration: line-through;
      }
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
  }

  &__slider-img {
    width: 100px;
    border: 1px solid transparent;
    transition: 300ms;
    cursor: pointer;

    @include _media-up(md) {
      width: 80px;
    }

    @include _media-up(lg) {
      width: 85px;
    }

    @include _media-up(xl) {
      width: 120px;
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

      @include _media-up(lg) {
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

    @include _media-up(lg) {
      gap: padding();
      grid-template-rows: 1fr;
      grid-template-columns: none;
      grid-auto-flow: column;
    }

    @include _media-up(xl) {
      gap: padding(2);
      grid-template-rows: 1fr;
      grid-template-columns: none;
      grid-auto-flow: column;
    }
  }
}
</style>
