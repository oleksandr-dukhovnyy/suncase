<template>
  <div class="bloor-contain"
      @click="closeCart"
  >
<!-- desktop cart -->
    <div
      class="contain contain-content_rules"
      @click.stop="closeMobileButtons"
      :ref="'contain'"
      :class="{
        op03: mobileShooseActionModalOpened
      }"
    >

      <div class="shop-controls">

        <div class="shop-header-contain"> <!-- header contain -->

          <div class="close-bttn-container"> <!-- close -->
            <img id="close"
              :src="'./img/sliderControl/closeBttn.svg'"
              alt="close"
              @click="closeCart"
            >
          </div> <!-- / close -->

          <div class="shop-controls-info">
            <div class="info-container">

              <div class="cart-icon">
                <span class="total-price">
                  ${{ totalPrice }}
                </span>
                <img class="cart-icon-img"
                    :src="'./img/cart/cartIcon.jpg'"
                  alt="cart"
                >
                <span class="items-in-cart">
                  {{ cart.length }}
                </span>
              </div>

              <div class="buy-all-contain"> <!-- buy all -->
                <button class="buy-all action-bttn"
                  @click="buyAll"
                >
                  Buy
                </button>
              </div>
            </div> <!-- info contain -->
            
            

          </div>
        </div>
        
      </div>
      <div class="goods-list-contain"
      >
        <div :class="{'goods-list': true}"
          v-if="cartItems.length > 0"
          :ref="'goodsList'"
          data-scroll-lock-scrollable
        >

          <div class="contain-bttn"
            v-for="( item, i ) in cartItems"
            :key="item.id"

            :class="{
              animate__animated: true,
              animate__zoomOutDown: deleteAnimation === item.id
            }"

            @mouseenter="showButtons = i"
            @mouseleave="showButtons = -1"
            @click="openMobileMenu( item.id )"
          >
            <ButtonsDesktop
              v-if="desktop"

              @openIt="openIt"
              @buyIt="buyIt"
              @deleteIt="deleteIt"
              @deleteAnimationOn="deleteAnimationOn"

              :active="showButtons === i"
              :id="item.id"
              :activeButton="showButtons === i"
            />

            <!-- <ButtonsMobile
              v-if="!desktop"

              @closeMobileButtons="closeMobileButtons"

              @openIt="openIt"
              @buyIt="buyIt"
              @deleteIt="deleteIt"

              :id="item.id"

              ref="buttonsMobile"
            /> -->
            <img class="small-icon"
              :src="`./img/${item.id}/1.jpg`"
              alt="pict"
            >
            <div class="p-info-contain">
              <span class="p-brend">
                {{ item.brend }}
              </span>
              <span class="p-model">
                {{ item.model | fixLength }}   
              </span>
              <span class="P_coast"
                v-if="!item.sale"
              >
                ${{ item.coast }}
              </span>
              <span class="P_sale"
                v-else
              >
                <span class="old-price">${{ item.oldCoast }}</span>
                <span class="new-price">${{ item.coast }}</span>
              </span>
              </div>
              <div class="new"
                  v-if="item.isNew"
              >new</div> 
              <div v-else class="new ghost">new</div>
          </div>
        </div>
      </div>
      
    </div>
<!-- / desktop cart -->

<!-- mobile cart -->

    <div class="mobile-cart">
      <header class="mc-header">
        <div class="mc-action-buttons">
          <div class="mc-cart-icon">
            <div class="mc-total-price">
              ${{ totalPrice }}
            </div>
            <img
              class="mc-cart-icon-img"
              :src="'./img/cart/cartIcon.jpg'"
              alt="cart"
            >
            <div class="mc-items-in-cart">
              {{ cart.length }}
            </div>
          </div>
          <button class="mc-buy"
            @click="buyAll"
          >Buy</button>
        </div>
        <div class="mc-close-bttn-contain">
          <img class="mc-close-icon _close_"
            :src="'./img/sliderControl/closeBttn.svg'"
            alt="close"
            @click="closeCart"
          >
        </div>
      </header>
      <section class="mc-goods-list"
        data-scroll-lock-scrollable
      >
        <div
          class="mc-card-contain"

          v-for="( item, i ) in cartItems"
          :key="i"

          @click.stop="openMobileMenu( item.id )"
        >
          <img class="mc-glass-img"
            :src="`./img/${item.id}/1.jpg`"
            alt="pict"
          >
          <div class="mc-info-contain">
            <div class="mc-info-brend">
              {{ item.brend }}
            </div>
            <div class="mc-info-model">
              {{ item.model | fixLength }}
            </div>
            <div class="mc-info-coast"
              v-if="!item.sale"
            >
              ${{ item.coast }}
            </div>
            <div class="mc-info-coast"
              v-else
            >
              <span class="mc-sale-old-price">${{ item.oldCoast }}</span>
              <span class="mc-sale-new-price">${{ item.coast }}</span>
            </div>
          </div>
          <div class="mc-new"
            v-if="item.isNew"
          >new</div>
          <div class="mc-new mc-hide"
            v-else
          >new</div>
        </div>
      </section>
    </div>

<!-- / mobile cart -->

    <div class="mobile-shoose-action-modal-contain"
      v-if="mobileShooseActionModalOpened"
      @click.stop="mobileShooseActionModalOpened = false"
    >
      <div class="mobile-shoose-action-modal shadowOn">
        <div class="close-contain">
          <img class=""
            :src="'./img/sliderControl/closeBttn.svg'"
            alt="close"
            id="close"
            @click.stop="mobileShooseActionModalOpened = false"
          >
        </div>
        <div class="buttons-contain">
          <button
            class="mobile-buy action-bttn"
            @click="msBuyIt"
          >
            buy
          </button>
          <button
            class="mobile-wiew action-bttn"
            @click="msOpenIt"
          >
            wiew
          </button>
          <button
            class="mobile-delete action-bttn"
            @click="msDeleteIt"
          >
            delete
          </button>
        </div>
          
      </div>
    </div>
    
  </div>
</template>

<script>
// funcs
import openPayWindow from '../../js/openPayWindow.js';
import scrollToGoods from '../../js/scrollToGoods.js';

// Components
import ButtonsDesktop from './buttons/ButtonsDesktop.vue';
import ButtonsMobile from './buttons/ButtonsMobile.vue';

export default {
  name: 'PopupShop',
  components: {
    ButtonsDesktop, ButtonsMobile
  },
  props: ["cart", "allItemsInTheCatolog", "totalPrice"],
  data(){
    return {
      cartItems: [],
      hideArrow: false,
      showButtons: -1,
      dontUnselect: [],
      stopDelete: 0,
      desktop: true,
      showContainShadow: false,
      mobileShooseActionModalOpened: false,
      msChoseId: null
    }
  },
  methods: {
    msBuyIt(){
      this.buyIt( this.msChoseId );
    },
    msOpenIt(){
      this.openIt( this.msChoseId );
    },
    msDeleteIt(){
      this.deleteIt( this.msChoseId );
    },
    openMobileMenu( id ){
      if( this.desktop === false ){
        this.msChoseId = id;
        this.mobileShooseActionModalOpened = true;
      }
    },
    deleteAnimationOn( id ){
      this.deleteAnimation = id;
    },
    buyAll(){
      if( this.cartItems.length < 1 ){
        this.addGoods();
      } else {
        openPayWindow( {
          coast: this.totalPrice,
          id: 'all'
        }, this.cartItems.length, () => {
          this.$emit( 'refreshTotalPrice' );
          this.closeCart();
        });
      }
    },
    closeMobileButtons(){
      if( this.$refs.buttonsMobile !== undefined )
        this.$refs.buttonsMobile.forEach( component => {
          component.dontShowButtns();
        });
    },
    closeCart( e ){
      this.$emit( 'closeCart' );
    },
    addGoods( e ){
      scrollToGoods();
      this.closeCart();
    },
    popupScroll( e ){
      if( e.target.scrollTop !== 0 ){
        this.hideArrow = true;
      }
    },
    buyIt( id ){        
      this.$emit( 'buyIt', id );
    },
    openIt( id ){
      this.$emit( 'openIt', id );
    },
    deleteIt( id ){
      this.$emit( 'deleteIt', id );
      this.cartItems.forEach( ( item, i ) => {
        if( id === item.id ){
          this.cartItems.splice( i, 1 );
        }
      });
    }
  },
  mounted() {    
    this.allItemsInTheCatolog.forEach( item => {
      this.cart.forEach( id => {
        if( item !== undefined && item !== null && item.id === id ){
          this.cartItems.push( item );
        }
      });
    });

    // check touchscreens devices
    this.desktop = !( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) );
  },
  filters: {
    fixLength( value ){
      return value.split( ' ' )[0];
    }
  }
}
</script>

<style scoped>

._close_ {
  width: 25px !important;
  height: 25px !important;
  opacity: 0.5 !important;
}

.goods-list-contain {
  height: 90%;
  /* background-color: blanchedalmond; */
}

.mobile-shoose-action-modal-contain {
  width: 100%;
  height: 100%;
  position: absolute;
  /* top: 50%; */
  z-index: 101;
  background-color: rgba( 255, 255, 255, 0.8 );

  overflow: hidden;
}

.close-contain img {
  width: 25px;
  height: 25px;
  opacity: 0.5;
}

.mobile-buy {
  background-color: red !important;
	border-color: red !important;
	color: white;
}

.buttons-contain {
  /* background-color: mediumturquoise; */
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  /* padding: 30px; */
  margin: 0 auto;
  width: 163px;
}

.op03 {
  opacity: 0.3 !important;
}

/* mobile-shoose */
.mobile-shoose-action-modal {
  overflow: hidden;
  display: flex;
  z-index: 102;
  position: fixed;
  flex-direction: column;
  width: 280px;
  align-items: flex-end;
  padding: 15px;
  height: 200px;
  background-color: white;
  left: calc( 50% - 155px );
  top: calc( 40% - 100px );
}

.mobile-shoose-action-modal button {
  line-height: 35px;
  font-size: 9px;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid black;
  margin-bottom: 16px;
}

.close-bttn-container {
  right: 15px;
  top: 15px;
  position: absolute;
}

.close-bttn-container > img {
  width: 25px;
  height: 25px;
  opacity: 0.5;
}

.contain-bttn {
  transition: 1s;
  display: flex;
  flex-direction: column;

  /* width: 180px; */
  height: 200px;
  margin-bottom: 30px;
  margin-top: 10px;

  width: 22.31%;
  min-width: 150px;
}

.goods-list {
  width: 100%;
  justify-content: space-evenly;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  padding-top: 3%;
}

.shadowOn {
  -webkit-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
}

.items-in-cart {
  margin-left: -11.9%;
  margin-top: 23.8%;
  font-size: 11px;
}
/* 
.shop-controls-info > *:last-child {
  margin-left: 10%;
} */

.shop-controls-info {
  display: flex;
  flex-direction: row;
  width: max-content;
  margin: 0 auto;
}
.shop-header-contain {
  padding: 0.7% 0 1%;
  max-width: 1000px;
  opacity: 1;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid rgb(153,153,153); */
}

@media ( max-device-width: 1000px ){
  .shop-header-contain {
    padding: 0.7% 0 6%;
  }
}

.info-container {
  width: 100%;
  align-items: center;
  display: flex;
}

.cart-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 35px;
  width: 40%;
  margin-left: -7%;
  margin-right: 7%;
}

.cart-icon-img {
  margin-left: 5%;
}

.total-price {
  margin-top: 15.3%;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.45em;
}

.contain > .shop-controls {
  display: flex;
  flex-direction: column;
  margin: 0px;
  background-color: white;
  padding-bottom: 44px;
}

.contain-content_rules {
  display: flex;
  flex-direction: column;
}

.justifySB {
  justify-content: space-between;
}

button:active {
  border: transparent;
}

.old-price {
  text-decoration: line-through;
}
.new-price {
  margin-left: 5px;
  color: red;
}

.ghost {
  opacity: 0;
}

.new {
  letter-spacing: normal;
  position: relative;
  top: -54%;
  left: 74%;
  text-transform: uppercase;
  width: 51px;
  height: 51px;
  text-align: center;
  line-height: 51px;
  color: red;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid red;
  border-radius: 50%;
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.new {
  -webkit-animation: rotating 12s linear infinite;
  -moz-animation: rotating 12s linear infinite;
  -ms-animation: rotating 12s linear infinite;
  -o-animation: rotating 12s linear infinite;
  animation: rotating 12s linear infinite;
}

.buy-all-contain {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.buy-all-contain .buy-all {
  border: 1px solid #e86868;

  color:#e86868;
}

.buy-all-contain .buy-all:hover {
  background-color: rgb( 227, 38, 54 );
  color: white;
  transition: 0.5s;
}

.action-bttn {
  background-color: transparent;
  transition: 0.5s;
  width: 163px;
  height: 43px;
  border-radius: 5px;
  font-size: 12px;
  letter-spacing: 0.45em;
  font-weight: 300;
  text-transform: uppercase;
}

.contain-bttn:active {
  outline: none;
}
.small-icon {
  width: 100%;  
}

.p-info-contain > span {
  letter-spacing: 0.45em;
  display: block;
  margin-top: 10px;
  margin-left: 6px;
}

.p-brend {
  font-size: 15px;
}

.p-model {
  color: #999;
  font-size: 12px;
}

.P_coast {
  font-size: 12px;
}

.P_sale {
  font-size: 12px;
}

.cart-is-empty {
  font-size: 16px;
  margin: 4%;
  color: rgb( 153 153 153 );
  text-transform: uppercase;
  letter-spacing: 0.45em;
  text-align: center;
  display: block;
}

.add-goods {
  width: 20%;
  margin: 0 auto;
}

.add-goods:hover {
  cursor: pointer;
}

/* CART MODAL */
.contain {
  z-index: 3;
  background-color: #fff;
  max-width: 1000px;
  width: 75%;
  height: 72%;
  max-height: 550px;
  position: fixed;
  padding: 5%;

  left: auto;
  right: auto;
  overflow: hidden;
  -webkit-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
  opacity: 1;
  border-bottom: 10px solid #fff;
}

.contain::-webkit-scrollbar { width: 5px; }
.contain { -ms-overflow-style: none; }

._close-bttn {
    width: 25px;
    height: 25px;
    opacity: 0.5;
  }
._close-bttn:hover {
  cursor: pointer;
}
/* / CART MODAL */
.fa-angle-down {
  width: 125px;
  height: 125px;
  color: #999;
  position: absolute;
  bottom: 50%;
  left: 48%;
  z-index: 4;
  -webkit-animation: jump 1.5s infinite;
          animation: jump 1.5s infinite;
  transition: 0.7s;
}
@-webkit-keyframes jump {
  0% {
    bottom: 0;
  }
  50% {
    bottom: 10px;
  }
  100% {
    bottom: 0;
  }
}
@keyframes jump {
  0% {
    bottom: 0;
  }
  50% {
    bottom: 10px;
  }
  100% {
    bottom: 0;
  }
}
@media ( min-device-width: 1300px ){
  .contain {
    padding: 38px;
  }
}
@media ( max-device-width: 900px ) {
  .shop-header-contain {
    border: none;
  }
}
@media ( max-device-width: 502px ) and ( orientation: portrait ){
  .goods-list {
    justify-content: space-evenly;
  }
}

@media ( orientation: landscape ) and ( max-device-width: 494px ) {
  .shop-header-contain {
    padding: 0.7% 0 15% 0;
  }
}


/* position, shadow, ect */
.mobile-cart {
  z-index: 3;
  background-color: #fff;
  width: 75%;
  height: 72%;
  top: 70px;
  position: fixed;

  
  left: auto;
  right: auto;
  overflow: hidden;
  -webkit-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
  opacity: 1;
}

/* content rules */
.mobile-cart {
  display: none;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  
  border: 15px solid #fff;
}
.mobile-cart > * {
  width: 100%;
}

/* header */
.mc-header {
  height: 15%;
  justify-content: center;
  display: flex;
}


/* header > action-buttons + close */
.mc-action-buttons {
  width: calc( 100% - 50px );
  height: 100%;
  margin-left: 25px;
}

.mc-close-icon {
  width: 25px;
  height: 25px;
  opacity: 0.5;
}


/* cart-icon + total price */
.mc-cart-icon {
  display: flex;
  flex-direction: row;

  width: 70px;
  height: 25px;
  padding: 5px;

  margin: 0 auto 8px;
}

.mc-items-in-cart {
  margin-top: 20%;
  margin-left: -14%;

  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.45em;
}

.mc-total-price {
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.45em;

  padding-top: 11px;
}

.mc-buy {
  background-color: transparent;
  transition: 0.5s;
  width: 160px;
  height: 43px;
  border-radius: 5px;
  font-size: 12px;
  letter-spacing: 0.45em;
  font-weight: 300;
  text-transform: uppercase;

  border: 1px solid rgb(232,104,104);
  color: rgb(232,104,104);
  margin: 0 calc( 50% - 80px );

}

/* cart body contain */
.mc-goods-list {
  height: calc( 85% - 45px );
  margin-top: 45px;
  overflow-y: scroll;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-evenly;
}

.mc-card-contain {
  width: 42%;
  margin-bottom: 20px;
}

.mc-glass-img {
  width: 100%;
}

.mc-info-contain > * {
  letter-spacing: 0.45em;
  font-weight: lighter;
  font-size: 11px;
}

.mc-info-brend {
  transition: 0.5s;
  font-size: 14px;
  margin-bottom: 7px;
}

.mc-info-model {
  transition: 0.5s;
  height: 7px;
  margin-bottom: 16px;
  color: rgb( 153, 153, 153 );
}

.mc-sale-old-price {
  text-decoration: line-through;
}

.mc-sale-new-price {
  color: red;
  margin-left: 10px;
}

.mc-new {
  position: relative;
  top: -92px;
  left: 71%;
  text-transform: uppercase;
  width: 41px;
  height: 41px;
  text-align: center;
  line-height: 41px;
  color: rgb( 255, 0, 0 );
  font-size: 10px;
  font-weight: 400;
  border: 1px solid red;
  border-radius: 50%;

  transform: rotate( -15deg );

  -webkit-animation: rotating 12s linear infinite;
  -moz-animation: rotating 12s linear infinite;
  -ms-animation: rotating 12s linear infinite;
  -o-animation: rotating 12s linear infinite;
  animation: rotating 12s linear infinite;
}

.mc-hide {
  opacity: 0 !important;
}

@media ( max-device-width: 445px ) and ( orientation: portrait ){
  .mobile-cart {
    display: flex;
  }
  .contain {
    display: none;
  }
}

@media ( max-device-width: 335px ) and ( orientation: portrait ) {
  .mc-card-contain {
    width: 80%;
  }
}

</style>