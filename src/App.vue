<template>
  <div id="app">

    <TopHeader
      :itemsInCart="cart.length"
      :totalPrice="totalPrice"
      :phoneNumber="currentPhoneNumber"
      :langActive="langActive"

      @setLanguage="setLanguage"
      @openCart="openCart"
    />
  
    <FirstScreen
      @toggledCategory="toggledCategory"
    />
      
    <Catalog
      @openSlider="openSelected"
      @openCart="openCart"

      @removeBodyScroll="removeBodyScroll"
      @addBodyScroll="addBodyScroll"

      :genderActive="genderActive"
      :itemsInCart="cart.length"
      :totalPrice="totalPrice"

      :allItemsInTheCatolog="allItemsInTheCatolog"
      ref="Catalog"
    />

    <PopupShop

      @buyIt="buyIt"
      @openIt="openSelected"
      @deleteIt="deleteItFromCart"
      @closeCart="closeCart"
      @refreshTotalPrice="refreshTotalPrice"

      v-if="showPopupShop"
      :cart="cart"
      :allItemsInTheCatolog="allItemsInTheCatolog"
      :totalPrice="totalPrice"
      :ref="`popupshop`"
    />

    <Slider
      :show="showSlider"
      :selected="getId( selected )"
      :showSlider="showSlider"

      @closeSlider="closeModal"
      @addToCart="addToCart"
      @buyIt="buyIt"
    />

    <PayModal
      v-if="showPayModal"
      :id="buyId"
      :allItems="allItemsInTheCatolog"

      @closePayModal="closePayModal"
    />

    <Footer />
  </div>
</template>

<script>
// funks
import { LocalStTool } from './js/LocalStTool.js';
import { Copy } from './js/CopyJS.js';
import { getId } from './js/getId.js';
import openPayWindow from './js/openPayWindow.js';
import Scroll from './js/removeBodyScroll.js';

// components
import Slider from './components/slider/slider.vue';
import Catalog from './components/Catalog.vue';
import PopupShop from './components/popup shop/PopupShop.vue';
import FirstScreen from './components/First_screen/FirstScreen.vue';
import TopHeader from './components/header/TopHeader.vue';
import Footer from './components/footer/Footer.vue';
import PayModal from './components/payModal/payModal.vue';

export default {
 name: 'App',
 components: {
   Slider, Catalog, PopupShop, TopHeader, FirstScreen, Footer, PayModal
 },
 data(){
   return {
    genderActive: [],
    currentPhoneNumber: '+38 063 244 1587',
    showSlider: false,
    showPopupShop: false,
    selected: 1,
    allItemsInTheCatolog: [
      {brend: 'Maui Jim', sale: true, oldCoast: 385, model: 'Mavericks', coast: 255, id: '1', gender: 'all', saled: 453, isNew: false, lng: 4},
      
      {brend: 'Ray-Ban', sale: false, oldCoast: 0, model: 'RB3447N Gold', coast: 145, id: '2', gender: 'man', saled: 523, isNew: true, lng: 4},
      {brend: 'Ray-Ban', sale: true, oldCoast: 165, model: 'RB3539 Black', coast: 92, id: '3', gender: 'woman', saled: 152, isNew: true, lng: 4},
      {brend: 'Ray-Ban', sale: true, oldCoast: 188, model: 'Sugar', coast: 138, id: '4', gender: 'all', saled: 43, isNew: false, lng: 4},

      {brend: 'Oakley', sale: false, oldCoast: 0, model: 'Sutro', coast: 145, id: '5', gender: 'all', saled: 143, isNew: false, lng: 4},
      {brend: 'Oakley', sale: false, oldCoast: 0, model: 'Evzero Path', coast: 139, id: '6', gender: 'all', saled: 343, isNew: true, lng: 4},
      {brend: 'Oakley', sale: false, oldCoast: 0, model: 'Holbrook', coast: 139, id: '7', gender: 'all', saled: 243, isNew: true, lng: 4},
      
      {brend: 'Prada', sale: false, oldCoast: 0, model: 'Cinema', coast: 253, id: '8', gender: 'all', saled: 743, isNew: false, lng: 3},
      {brend: 'Prada', sale: false, oldCoast: 0, model: 'PR53US', coast: 117, id: '9', gender: 'woman', saled: 1343, isNew: true, lng: 2},
      {brend: 'Prada', sale: false, oldCoast: 0, model: 'Millennials', coast: 109, id: '10', gender: 'all', saled: 103, isNew: true, lng: 4},
      
      {brend: 'Levis', sale: true, oldCoast: 64, model: 'Tortoise', coast: 27, id: '11', gender: 'all', saled: 62, isNew: true, lng: 2},
      {brend: 'Levis', sale: true, oldCoast: 40, model: 'LO22395 Red', coast: 20, id: '12', gender: 'all', saled: 482, isNew: false, lng: 2},
      {brend: 'Levis', sale: true, oldCoast: 40, model: 'LO22393 Tortoise', coast: 20, id: '13', gender: 'woman', saled: 160, isNew: false, lng: 2},
      
      {brend: 'Persol', sale: false, oldCoast: 0, model: 'PO3092SM Brown', coast: 170, id: '14', gender: 'all', saled: 60, isNew: false, lng: 4},
      {brend: 'Persol', sale: false, oldCoast: 0, model: 'PO9714S', coast: 139, id: '15', gender: 'all', saled: 90, isNew: false, lng: 4},

      {brend: 'Versace', sale: false, oldCoast: 0, model: 'PO9714S', coast: 199, id: '16', gender: 'all', saled: 190, isNew: false, lng: 4},
      {brend: 'Versace', sale: false, oldCoast: 0, model: 'VE2184', coast: 205, id: '17', gender: 'all', saled: 290, isNew: false, lng: 3},

      {brend: 'Polaroid', sale: true, oldCoast: 80, model: 'PLD4139B', coast: 75, id: '18', gender: 'all', saled: 390, isNew: false, lng: 4},
      {brend: 'Polaroid', sale: true, oldCoast: 90, model: 'PLD4139B', coast: 74, id: '19', gender: 'woman', saled: 50, isNew: false, lng: 3},
    
      {brend: 'Saint Laurent', sale: true, oldCoast: 195, model: 'SL108 Fluo', coast: 95, id: '20', gender: 'woman', saled: 50, isNew: false, lng: 1},
      {brend: 'Saint Laurent', sale: true, oldCoast: 550, model: 'SL302 LISA', coast: 420, id: '21', gender: 'woman', saled: 50, isNew: false, lng: 4},
    
      {brend: 'Christian Dior', sale: true, oldCoast: 203, model: 'DIORCLUB1 Black', coast: 179, id: '22', gender: 'all', saled: 115, isNew: false, lng: 3},
      {brend: 'Christian Dior', sale: true, oldCoast: 203, model: 'DiorSplit1 Split1', coast: 189, id: '23', gender: 'all', saled: 15, isNew: false, lng: 4},
    ],
    cart: [],
    totalPrice: 0,
    showCartIcon: false,
    langActive: 'eng',
    showPayModal: false,
    buyId: 0
   }
 },
 methods: {
  removeBodyScroll(){
    Scroll.rem();
  },
  addBodyScroll(){
    Scroll.add();
  },
  getId( id ){
    let target = null;
    this.allItemsInTheCatolog.forEach( item => {
      if( item.id === `${id}` ){
        target = item;
      }
    });
    return target;
  },
  closeCart(){
    this.addBodyScroll();
    this.showPopupShop = false;
  },
  openCart(){
    this.removeBodyScroll();
    this.showPopupShop = true;
  },
  deleteItFromCart( id ){
    let index = this.cart.indexOf( id );
    if( index !== -1 ){
      this.cart.splice( index, 1 );
      this.refreshTotalPrice();
      LocalStTool._add( 'Cart', Copy._arr( this.cart ) );
    }
  },
  refreshTotalPrice(){
    let totalPrice = 0;     
    this.cart.forEach( item => {
      totalPrice += getId( item, this.allItemsInTheCatolog ).coast;
    });
    this.totalPrice = totalPrice;
  },
  openSelected( id ){
    this.selected = id;
    
    this.showSlider = true;
    this.removeBodyScroll();
  },
  closeModal(){
    this.addBodyScroll();
    this.showSlider = false;
  },
  addToCart( id ){
    this.showCartIcon = true;
    setTimeout( () => {
      this.showCartIcon = false;
    }, 500 );
    if( this.cart.indexOf( id ) === -1 ){
      this.cart.push( id );
      LocalStTool._add( 'Cart', Copy._arr( this.cart ) );
    }
    this.refreshTotalPrice();
  },
  buyIt( id ){
  this.allItemsInTheCatolog.forEach( item => {
    if( item.id === id ){
      openPayWindow( item, 1, id => {
        if( id === 'all' ){
          this.cart = [];
        } else {
          let index = this.cart.indexOf( id );
          if( index !== -1 ){
            this.cart.splice( index, 1 );
          }
        }
        this.totalPrice -= item.coast;
      });
    }
  });
    LocalStTool._add( 'Cart', Copy._arr( this.cart ) );
    this.refreshTotalPrice();
  },
  clearCart(){
    this.cart = [];
    LocalStTool._add( 'Cart', Copy._arr( this.cart ) );
  },
  closePayModal(){
    this.showPayModal = false;
  },
  toggledCategory( category ){
    let index = this.genderActive.indexOf( category );
    if( index === -1 ){
      setTimeout( ()=>{
      this.genderActive.push( category );
      this.$refs.Catalog.refreshFilters();
      }, 800);
    }
  },
  setLanguage( newLanguage ) {
    this.langActive = newLanguage;
    // ...
  }
 },
 mounted(){
  let cloudCart = LocalStTool._get( 'Cart' );
  if( cloudCart !== null ){
    this.cart = cloudCart;
  } else {
    LocalStTool._add( 'Cart', Copy._arr( this.cart ) );
  }
  this.refreshTotalPrice();
 }
}
</script>

<style>
  html.unscroll,
  body.unscroll {
   height: 100%;
   overflow: hidden;
  }
  .unscroll {
    overflow: hidden;
  }
  body,
  html {
    -ms-overflow-style: none;
    scroll-behavior: smooth;
  }
  * {
    margin: 0px;
    padding: 0px;
    outline: none;
  }
  *:hover {
    outline: none;
  }
  .borderRad5 {
    border-radius: 5px;
  }
  .bold {
    font-weight: bold;
  }
  .letterS250 {
    letter-spacing: 0.25em;
  }
  .letterS450 {
    letter-spacing: 0.45em;
  }
  #app {
    display: flex;
    flex-direction: column;
    margin: 75px auto 0;
  }
  button:hover {
    cursor: pointer;
  }
  body {
    width: 100%;
  }

  /* support classes */
  .hide {
    display: none !important;
  }
  .back-show {
    background-color: darkorange !important;
  }
</style>