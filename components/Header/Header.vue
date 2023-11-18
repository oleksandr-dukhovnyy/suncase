<template>
  <div class="header__contain">
    <header class="header">
      <div
        class="contacts animate__animated animate__fadeInLeft"
        @click="scrollToTop"
      >
        <p>
          <span class="contacts__phone">{{ phone }}</span>
          <span class="contacts__city"> Kyiv </span>
        </p>
      </div>
      <div class="left-group animate__animated animate__fadeInRight">
        <HeaderLagns
          @change-current-lang="onChangeCurrentLang"
          :langs="langs"
        />
        <HeaderCart @open-cart="cartStore.SHOW_CART" />
      </div>
      <Cart v-if="show" @close="cartStore.HIDE_CART" />
    </header>
  </div>
</template>

<script lang="ts" setup>
import HeaderLagns from './HeaderLagns.vue';
import HeaderCart from './HeaderCart.vue';
import Cart from './Cart/HCart.vue';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();
const show = computed(() => cartStore.SHOW_CART_POPUP);

const scrollToTop = () => {
  self.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// langs
const langs = ref([
  {
    title: 'eng',
    value: 'en-US',
    selected: true,
  },
  {
    title: 'ua',
    value: 'uk-UA',
    documentLanguagesValue: 'uk',
    selected: false,
  },
]);

const userLangs = globalThis?.navigator?.languages || [];

for (let i = 0; i < userLangs.length; i++) {
  const lang = langs.value.find(
    (loc) => (loc.documentLanguagesValue || loc.value) === userLangs[i]
  );

  if (lang) {
    langs.value.forEach((l) => (l.selected = false));
    lang.selected = true;
    break;
  }
}

const setSelectedLang = (langValue) => {
  langs.value = langs.value.map((lng) => ({
    ...lng,
    selected: lng.value === langValue,
  }));
};

const latestSelectedLang = localStorage.getItem('lang');
if (latestSelectedLang) setSelectedLang(latestSelectedLang);

const onChangeCurrentLang = (newLang) => {
  // $store.dispatch('locale/CHANGE_LANG', newLang);
  setSelectedLang(newLang.value);
  localStorage.setItem('lang', newLang.value);
};
</script>

<style lang="scss" scoped>
.header {
  @include container;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: padding(2);
  z-index: 1;
  padding: 30px;

  background-color: #fff;

  @include media-up(sm) {
    flex-direction: row;
  }

  &__contain {
    background-color: #fff;
    position: fixed;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    top: 0;
    left: 0;
  }

  .contacts {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0;

    p {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;

      height: 36px;
    }

    &__phone {
      @include font-sm;
      font-weight: 400;
      letter-spacing: 0.25em;
    }

    &__city {
      font-size: $font-size-xxsm;
      color: #999;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: $font-color-muted;
      display: block;
      margin-top: 10px;
    }
  }

  .left-group {
    display: flex;
    gap: 50px;
    width: 100%;
    justify-content: space-evenly;

    @include media-up(sm) {
      width: max-content;
      justify-content: unset;
    }
  }
}
</style>
