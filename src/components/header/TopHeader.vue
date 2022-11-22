<template>
  <header class="header">
    <div class="phone-number" @click="scrollUp">{{ phoneNumber }}</div>
    <div class="action-contain">
      <Languages :langActive="langActive" @setLanguage="setLanguage" />

      <div class="cart-icon" @click="openCart">
        <span class="total-price" @click="openCart"> ${{ totalPrice }} </span>
        <img
          class="cart-icon-img"
          :src="'./img/cart/cartIcon.jpg'"
          alt="cart"
          @click="openCart"
        />
        <span class="items-in-cart" @click="openCart">
          {{ itemsInCart }}
        </span>
      </div>
    </div>
  </header>
</template>

<script>
// components
import Languages from './Languages.vue';

export default {
  name: 'TopHeader',
  props: ['itemsInCart', 'totalPrice', 'phoneNumber', 'langActive'],
  components: {
    Languages,
  },
  methods: {
    scrollUp() {
      window.scrollTo(0, 0);
    },
    openCart() {
      this.$emit('openCart');
    },
    setLanguage(newLanguage) {
      this.$emit('setLanguage', newLanguage);
    },
  },
};
</script>

<style scoped>
.action-contain {
  width: max-content;
  display: flex;
  flex-direction: row;
  padding-top: 18px;
}

.cart-icon-img {
  position: relative;
}

.items-in-cart {
  position: relative;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.45em;
  margin-left: -16px;
  top: 0px;
}
.header {
  top: 0px;
  position: fixed;
  width: 100%;
  max-width: 1140px;
  height: 65px;
  background-color: white;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 0 calc((100% - 1140px) / 2);
}
.cart-icon {
  margin-right: 15px;
  margin-left: 20px;
  height: max-content;
  width: max-content;
}
.cart-icon:hover {
  cursor: pointer;
}
.total-price {
  position: relative;
  bottom: 4px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.45em;
}
.phone-number {
  font-size: 14px;
  letter-spacing: 0.25em;
  margin-top: 16px;
  margin-left: 15px;
  width: max-content;
}
.phone-number:hover {
  cursor: pointer;
}
.phone-number::after {
  content: 'Kyiv';
  position: relative;
  top: 20px;
  right: 47%;

  color: #999;
  font-size: 11px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
}

@media (max-device-width: 460px) and (orientation: portrait) {
  .header > * {
    width: 100%;
    justify-content: space-evenly;
  }
  .header {
    flex-direction: column;
    text-align: center;
    height: 100px;
  }

  .cart-icon {
    margin-right: 0px;
  }

  .phone-number {
    padding-left: 10px;
  }

  .phone-number::after {
    left: -110px;
  }
}
</style>
