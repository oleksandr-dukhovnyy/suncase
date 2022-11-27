<template>
  <div id="app">
    <TopHeader
      :phoneNumber="currentPhoneNumber"
      :langActive="langActive"
      @setLanguage="setLanguage"
    />
    <FirstScreen />
    <Catalog ref="Catalog" />
    <PopupShop />
    <Slider />
    <Footer />
  </div>
</template>

<script>
// components
import Slider from './components/slider/slider.vue';
import Catalog from './components/Catalog.vue';
import PopupShop from './components/popup shop/PopupShop.vue';
import FirstScreen from './components/First_screen/FirstScreen.vue';
import TopHeader from './components/header/TopHeader.vue';
import Footer from './components/footer/Footer.vue';
import PayModal from './components/payModal/payModal.vue';

// store
import { mapActions, mapGetters } from 'vuex';

const vuexActions = {
  FETCH_SUNGLASESS: 'glasses/FETCH_SUNGLASESS',
  FETCH_CART: 'cart/FETCH_CART',
};
const vuexGetters = {
  SUNGLASESS_LIST: 'glasses/SUNGLASESS_LIST',
};

export default {
  name: 'App',
  components: {
    Slider,
    Catalog,
    PopupShop,
    TopHeader,
    FirstScreen,
    Footer,
    PayModal,
  },
  data() {
    return {
      currentPhoneNumber: '+38 063 244 1587',
      showCartIcon: false,
      langActive: 'eng',
    };
  },
  created() {
    this.FETCH_SUNGLASESS();
  },
  computed: {
    ...mapGetters(vuexGetters),
  },
  methods: {
    ...mapActions(vuexActions),
    setLanguage(newLanguage) {
      this.langActive = newLanguage;
      // ...
    },
  },
  mounted() {
    this.FETCH_CART();
  },
};
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
  /* border: 1px solid black; */
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
