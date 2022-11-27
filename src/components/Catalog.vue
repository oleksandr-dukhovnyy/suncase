<template>
  <div class="shop" id="shop">
    <div class="hamburger-menu">
      <img
        :src="'./img/menuControlls/icons8-menu.svg'"
        alt="menu"
        @click.stop="opendHamburger"
        class="hamburger-menu-icon"
      />
      <MobileMenu :show="openedHamburger" @closeMenu="closeMobileHamburger" />
    </div>
    <div class="menu">
      <GenderCategory />
      <span class="line"></span>
      <FilterCategory />
      <div class="line"></div>
      <BrendCategory />
    </div>

    <div :class="{ catalog: true }">
      <button
        :class="{
          'contain-bttn': true,
        }"
        v-for="item in SUNGLASESS_LIST"
        :key="item.id"
        @click="openItInModal(item.id)"
      >
        <img
          class="small-img-icon"
          :src="`./img/${item.id}/1.jpg`"
          alt="pict"
        />
        <div class="c-info-contain">
          <span class="c-brend cta-color">
            {{ item.brend }}
          </span>
          <span class="c-model">
            {{ item.model }}
          </span>
          <span class="C_coast cta-color" v-if="!item.sale">
            ${{ item.coast }}
          </span>
          <span class="C_sale" v-else>
            <span class="old-price cta-color">${{ item.oldCoast }}</span>
            <span class="new-price">${{ item.coast }}</span>
          </span>

          <div class="new" v-if="item.isNew">new</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
// components
import GenderCategory from './categories/GenderCategory.vue';
import FilterCategory from './categories/FilterCategory.vue';
import BrendCategory from './categories/BrendCategory.vue';
import MobileMenu from './hamburger for mobile/Menu.vue';

// vuex
import { mapActions, mapGetters } from 'vuex';

const vuexActions = {
  SET_SELECTED: 'slider/SET_SELECTED',
  SHOW_SLIDER: 'slider/SHOW_SLIDER',
};

const vuexGetters = {
  ACTIVE_GENDERS: 'glasses/ACTIVE_GENDERS',
  ACTIVE_CATEGORIES: 'glasses/ACTIVE_CATEGORIES',
  ACTIVE_BRANDS: 'glasses/ACTIVE_BRANDS',
  SUNGLASESS_LIST: 'glasses/SUNGLASESS_LIST',
};

export default {
  name: 'Catalog',
  components: {
    GenderCategory,
    FilterCategory,
    BrendCategory,
    MobileMenu,
  },
  computed: { ...mapGetters(vuexGetters) },
  data() {
    return {
      openedHamburger: false,
    };
  },
  methods: {
    ...mapActions(vuexActions),
    openItInModal(id) {
      this.closeMobileHamburger();
      this.SET_SELECTED(id);
      this.SHOW_SLIDER();
    },
    closeMobileHamburger() {
      this.addBodyScroll_();
      this.openedHamburger = false;
    },
    opendHamburger() {
      this.removeBodyScroll_();
      this.openedHamburger = true;
    },
  },
};
</script>

<style scoped>
.space-evenly {
  justify-content: space-evenly;
}

/* catalog item card */
.contain-bttn {
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  width: 22.31%;
  min-width: 210px;
  height: 200px;
  margin-bottom: 2.31%;

  margin-left: 2.31%;
  /* background-color: darkorange; */

  padding: 15px;
}

@media (max-device-width: 690px) {
  .contain-bttn {
    min-width: 150px;
    padding: 1%;
  }
}

.shop {
  width: 96.5%;
  max-width: 1300px;
  text-align: center;
  margin: 50px auto 0;
  display: flex;
}
.catalog {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 30px 30px;
  align-items: flex-start;
  width: 100%;
  height: max-content;
  margin: 0 auto;

  justify-content: space-evenly;
}
.menu {
  z-index: 0;
  width: calc(12.69% + 60px);
  display: flex;
  /* background-color: midnightblue; */
  flex-direction: column;
  padding: 2.31%;
}

.small-img-icon {
  width: 100%;
}

/* ///////////////////// */
.c-info-contain {
  text-align: left;
  width: 100%;
  margin-left: 7px;
}
.c-info-contain > * {
  display: block;
  letter-spacing: 0.45em;
  font-weight: lighter;
  font-size: 12px;
}
.c-brend {
  transition: 0.5s;
  font-size: 15px;
  margin-bottom: 12px;
}
.c-model {
  transition: 0.5s;
  height: 12px;
  margin-bottom: 16px;
  color: #999;
}
.new {
  position: relative;
  top: -104px;
  left: 70%;
  text-transform: uppercase;
  width: 51px;
  height: 51px;
  text-align: center;
  line-height: 51px;
  color: red;
  font-size: 10px;
  font-weight: 400;
  border: 1px solid red;
  border-radius: 50%;

  transform: rotate(-15deg);
  letter-spacing: normal;
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

.new-shtamp {
  text-transform: uppercase;
  width: 51px;
  height: 51px;
  text-align: center;
  line-height: 51px;
  color: red;
  font-size: 10px;
  font-weight: 400;
  border: 1px solid red;
  border-radius: 50%;

  transform: rotate(-25deg);

  position: relative;
  top: -61px;
  right: -152px;
}

.ghost {
  opacity: 0;
}
.old-price {
  text-decoration: line-through;
}
.new-price {
  margin-left: 5px;
  color: red;
}
.active-menu {
  color: black;
}
.line {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 60%;
  margin-left: 40%;
  height: 1px;
  background-color: #999;
}
/*  */

.hamburger-menu {
  width: 100%;
  display: none;
}

.hamburger-menu-icon {
  width: 68px;
  height: 55px;
  opacity: 0.5;
  margin-bottom: 7%;
}

@media (max-device-width: 530px) {
  .menu {
    display: none;
  }
  .hamburger-menu {
    display: flex;
  }
  .catalog {
    padding: 0px;
    width: 100%;
  }
  .shop {
    flex-direction: column;
  }
  .contain-bttn {
    margin: 0 0 10px;
  }
}

/*


@media ( max-device-width: 768px ){
    .hamburger-menu {
        font-size: 12px !important;
    }
}

@media ( max-device-width: 600px ) and ( orientation: landscape ){
    .shop {
        justify-content: center;
    }
    .catalog {
        margin-left: -18%;
    }
}

@media ( max-device-width: 425px ) and ( orientation: portrait ){
    .contain-bttn {
        width: 83%;
    }
    .catalog {    
        margin-left: -27%;
    }
} */
</style>
