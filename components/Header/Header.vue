<template>
  <div class="header__contain">
    <header class="header">
      <div
        class="contacts animate__animated animate__fadeInLeft"
        @click="scrollToTop"
      >
        <p>
          <span class="contacts__phone">{{ phone }}</span>
          <span class="contacts__city">
            {{ t('location') }}
          </span>
        </p>
      </div>
      <div class="left-group animate__animated animate__fadeInRight">
        <HeaderLangs
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
import HeaderLangs from './HeaderLangs.vue';
import HeaderCart from './HeaderCart.vue';
import Cart from './Cart/HCart.vue';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();
const { t } = useLocator();
const show = computed(() => cartStore.SHOW_CART_POPUP);

const scrollToTop = () => {
  navigateTo('/');

  self.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const langs = ref<Localization.Lang[]>([
  {
    title: 'en',
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

const locator = useLocator();

const setSelectedLang = async (langValue: Localization.Lang['value']) => {
  const result = await locator.setLocale(langValue);

  if (result) {
    langs.value = langs.value.map((lng) => ({
      ...lng,
      selected: lng.value === langValue,
    }));
  }
};

onMounted(() => {
  const latestSelectedLang = localStorage.getItem(
    'lang'
  ) as Localization.Lang['value'];

  if (latestSelectedLang) setSelectedLang(latestSelectedLang);
});

const onChangeCurrentLang = (newLang: Localization.Lang) => {
  setSelectedLang(newLang.value);

  localStorage.setItem('lang', newLang.value);
};
</script>

<style lang="scss" scoped>
.header {
  @include container;

  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: padding(2);
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  padding: 30px;
  background-color: #fff;

  @include media-up(sm) {
    flex-direction: row;
  }

  &__contain {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: #fff;
  }

  .contacts {
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;

    p {
      display: flex;
      flex-direction: column;
      place-items: center center;
      height: 36px;
    }

    &__phone {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.25em;
    }

    &__city {
      display: block;
      margin-top: 10px;
      color: $color-muted;
      font-size: 11px;
      letter-spacing: 0.35em;
      text-transform: uppercase;
    }
  }

  .left-group {
    display: flex;
    gap: 50px;
    justify-content: space-evenly;
    width: 100%;

    @include media-up(sm) {
      justify-content: unset;
      width: max-content;
    }
  }
}
</style>
