<template>
  <div class="bloor-contain" @click="HIDE_CART" v-if="SHOW_CART_POPUP">
    <!-- desktop cart -->
    <div
      class="contain contain-content_rules"
      @click.stop="closeMobileButtons"
      :ref="'contain'"
      :class="{
        op03: mobileShooseActionModalOpened,
      }"
    >
      <div class="shop-controls">
        <div class="shop-header-contain">
          <!-- header contain -->

          <!-- close -->
          <div class="close-bttn-container">
            <img
              id="close"
              :src="'./img/sliderControl/closeBttn.svg'"
              alt="close"
              @click="HIDE_CART"
            />
          </div>
          <!-- / close -->

          <div class="shop-controls-info">
            <div class="info-container">
              <div class="cart-icon">
                <span class="total-price cta-color">
                  ${{ CART_TOTAL_PRICE }}
                </span>
                <img
                  class="cart-icon-img"
                  :src="'./img/cart/cartIcon.jpg'"
                  alt="cart"
                />
                <span class="items-in-cart">
                  {{ CART_LENGTH }}
                </span>
              </div>

              <div class="buy-all-contain">
                <!-- buy all -->
                <button class="buy-all action-bttn" @click="buyAll">Buy</button>
              </div>
            </div>
            <!-- info contain -->
          </div>
        </div>
      </div>
      <div class="goods-list-contain" data-scroll-lock-scrollable>
        <div
          v-if="CART_LENGTH > 0"
          class="goods-list"
          data-scroll-lock-scrollable
        >
          <!-- <div
            class="contain-bttn"
            v-for="(item, i) in CART"
            :key="item.id"
            :class="{
              animate__animated: true,
              animate__zoomOutDown: deleteAnimation === item.id,
            }"
            @mouseenter="showButtons = i"
            @mouseleave="showButtons = -1"
            @click="openMobileMenu(item.id)"
          >
            <ButtonsDesktop
              v-if="desktop"
              @openIt="openIt_"
              @buyIt="buyIt_"
              @deleteIt="deleteIt"
              @deleteAnimationOn="deleteAnimationOn"
              :active="showButtons === i"
              :id="item.id"
              :activeButton="showButtons === i"
            />

            <ButtonsMobile
              v-if="!desktop"
              @closeMobileButtons="closeMobileButtons"
              @openIt="openIt_"
              @buyIt="buyIt_"
              @deleteIt="deleteIt"
              :id="item.id"
              ref="buttonsMobile"
            />
            <img
              class="small-icon"
              :src="`./img/${item.id}/1.jpg`"
              alt="pict"
            />
            <div class="p-info-contain">
              <span class="p-brend cta-color">
                {{ item.brend }}
              </span>
              <span class="p-model">
                {{ item.model | fixLength }}
              </span>
              <span class="P_coast cta-color" v-if="!item.sale">
                ${{ item.coast }}
              </span>
              <span class="P_sale" v-else>
                <span class="old-price cta-color">${{ item.oldCoast }}</span>
                <span class="new-price">${{ item.coast }}</span>
              </span>
            </div>
            <div class="new" v-if="item.isNew">new</div>
            <div v-else class="new ghost">new</div>
          </div> -->
          <GoodsListItem v-for="item in CART" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
    <!-- / desktop cart -->

    <!-- mobile cart -->

    <div class="mobile-cart">
      <header class="mc-header">
        <div class="mc-action-buttons">
          <div class="mc-cart-icon">
            <div class="mc-total-price cta-color">${{ CART_TOTAL_PRICE }}</div>
            <img
              class="mc-cart-icon-img"
              :src="'./img/cart/cartIcon.jpg'"
              alt="cart"
            />
            <div class="mc-items-in-cart">
              {{ CART_LENGTH }}
            </div>
          </div>
          <button class="mc-buy" @click="buyAll">Buy</button>
        </div>
        <div class="mc-close-bttn-contain">
          <img
            class="mc-close-icon _close_"
            :src="'./img/sliderControl/closeBttn.svg'"
            alt="close"
            @click="HIDE_CART"
          />
        </div>
      </header>
      <section class="mc-goods-list" data-scroll-lock-scrollable>
        <div
          class="mc-card-contain"
          v-for="(item, i) in CART"
          :key="i"
          @click.stop="openMobileMenu(item.id)"
        >
          <img
            class="mc-glass-img"
            :src="`./img/${item.id}/1.jpg`"
            alt="pict"
          />
          <div class="mc-info-contain">
            <div class="mc-info-brend cta-color">
              {{ item.brend }}
            </div>
            <div class="mc-info-model">
              {{ item.model | fixLength }}
            </div>
            <div class="mc-info-coast cta-color" v-if="!item.sale">
              ${{ item.coast }}
            </div>
            <div class="mc-info-coast cta-color" v-else>
              <span class="mc-sale-old-price cta-color"
                >${{ item.oldCoast }}</span
              >
              <span class="mc-sale-new-price">${{ item.coast }}</span>
            </div>
          </div>
          <div class="mc-new" v-if="item.isNew">new</div>
          <div class="mc-new mc-hide" v-else>new</div>
        </div>
      </section>
    </div>

    <!-- / mobile cart -->

    <div
      class="mobile-shoose-action-modal-contain"
      v-if="mobileShooseActionModalOpened"
      @click.stop="mobileShooseActionModalOpened = false"
    >
      <div class="mobile-shoose-action-modal shadowOn">
        <div class="close-contain">
          <img
            class=""
            :src="'./img/sliderControl/closeBttn.svg'"
            alt="close"
            id="close"
            @click.stop="mobileShooseActionModalOpened = false"
          />
        </div>
        <div class="buttons-contain">
          <button class="mobile-buy action-bttn" @click="msBuyIt">buy</button>
          <button class="mobile-wiew action-bttn" @click="msOpenIt">
            wiew
          </button>
          <button class="mobile-delete action-bttn" @click="msDeleteIt">
            delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// funcs
import scrollToGoods from '../../js/scrollToGoods.js';

// Components
// import ButtonsDesktop from './buttons/ButtonsDesktop.vue';
// import ButtonsMobile from './buttons/ButtonsMobile.vue';
import GoodsListItem from './GoodsListItem.vue';

// vuex
import { mapActions, mapGetters } from 'vuex';

const vuexActions = {
  HIDE_CART: 'cart/HIDE_CART',
  SHOW_CART: 'cart/SHOW_CART',
  DELETE_ITEM: 'cart/DELETE_ITEM',
  SET_SELECTED: 'slider/SET_SELECTED',
  SHOW_SLIDER: 'slider/SHOW_SLIDER',
};
const vuexGetters = {
  CART_TOTAL_PRICE: 'cart/CART_TOTAL_PRICE',
  SHOW_CART_POPUP: 'cart/SHOW_CART_POPUP',
  CART: 'cart/CART',
  CART_LENGTH: 'cart/CART_LENGTH',
};

// ms - mobile store (cart)

export default {
  name: 'PopupShop',
  components: {
    // ButtonsDesktop,
    // ButtonsMobile,
    GoodsListItem,
  },
  data() {
    return {
      hideArrow: false,
      showButtons: -1,
      desktop: true,
      mobileShooseActionModalOpened: false,
      msChoseId: null,
    };
  },
  methods: {
    ...mapActions(vuexActions),
    msBuyIt() {
      this.buyIt_(this.msChoseId);
    },
    msOpenIt() {
      // this.openIt(this.msChoseId);
      this.openModal_(this.msChoseId);
    },
    msDeleteIt() {
      this.DELETE_ITEM(this.msChoseId);
    },
    openMobileMenu(id) {
      if (this.desktop === false) {
        this.msChoseId = id;
        this.mobileShooseActionModalOpened = true;
      }
    },
    deleteAnimationOn(id) {
      this.deleteAnimation = id;
    },
    buyAll() {
      if (this.CART_LENGTH < 1) {
        this.addGoods();
      } else {
        this.buyAll_();
      }
    },
    closeMobileButtons() {
      if (this.$refs.buttonsMobile !== undefined)
        this.$refs.buttonsMobile.forEach((component) => {
          component.dontShowButtns();
        });
    },
    addGoods() {
      scrollToGoods();
      this.HIDE_CART();
    },
    popupScroll(e) {
      if (e.target.scrollTop !== 0) {
        this.hideArrow = true;
      }
    },
    // buyIt(id) {
    //   this.$emit('buyIt', id);
    // },
    openIt(id) {
      // this.$emit('openIt', id);
      this.SET_SELECTED(id);
      this.SHOW_SLIDER();
    },
    deleteIt(id) {
      this.DELETE_ITEM(id);
    },
  },
  computed: {
    ...mapGetters(vuexGetters),
  },
  mounted() {
    // this.allItemsInTheCatolog.forEach((item) => {
    //   this.cart.forEach((id) => {
    //     if (item !== undefined && item !== null && item.id === id) {
    //       this.cartItems.push(item);
    //     }
    //   });
    // });

    // check touchscreens devices
    this.desktop =
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  },
  filters: {
    fixLength(value) {
      return value.split(' ')[0];
    },
  },
};
</script>

<style scoped src="./PopupShop.css"></style>
