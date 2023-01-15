<template>
  <section
    :class="{
      hamburger: true,
      animate__animated: true,
      hide: !show,
    }"
    @click="closeMenu"
    @touchstart="startTouch"
    @touchend="checkTouchEnd"
  >
    <div
      :class="{
        'hamburger-content-contain': true,
        animate__animated: true,
        animate__fadeInLeft: show,
        animate__fadeOutLeft: !show,
      }"
      @click.stop
      data-scroll-lock-scrollable
    >
      <button class="hamburger-close" @click="closeMenu">
        <img :src="'./img/sliderControl/closeBttn.svg'" alt="x" />
      </button>

      <div class="hamburger-contain">
        <nav class="hamburger-nav">
          <div class="hamburger-nav-flex-contain">
            <div class="hamburger-nav-contain gender">
              <button
                v-for="item in FILTERS.genders"
                :key="item.name"
                :class="{
                  'hamburger-nav-item': true,
                  selected: item.active,
                }"
                @click="TOGGLE_FILTER_GENDERS(item.name)"
              >
                {{ item.title }}
                <svg
                  v-if="item.active"
                  width="23px"
                  height="23px"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="okIconTitle"
                  stroke="#0878ff"
                  stroke-width="0.768"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  color="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_iconCarrier">
                    <title id="okIconTitle">Ok</title>
                    <polyline points="4 13 9 18 20 7"></polyline>
                  </g>
                </svg>
              </button>
            </div>
            <div class="line"></div>
            <div class="hamburger-nav-contain">
              <button
                v-for="item in FILTERS.categories"
                :key="item.name"
                class="hamburger-nav-item"
                :class="{
                  selected: item.active,
                }"
                @click="TOGGLE_FILTER_CATEGORIES(item.name)"
              >
                {{ item.title }}
                <svg
                  v-if="item.active"
                  width="23px"
                  height="23px"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="okIconTitle"
                  stroke="#0878ff"
                  stroke-width="0.768"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  color="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_iconCarrier">
                    <title id="okIconTitle">Ok</title>
                    <polyline points="4 13 9 18 20 7"></polyline>
                  </g>
                </svg>
              </button>
            </div>
            <div class="line"></div>
          </div>
          <div class="hamburger-nav-contain-brends">
            <button
              v-for="item in FILTERS.brands"
              :key="item.name"
              :class="{
                'hamburger-nav-item': true,
                selected: item.active,
              }"
              @click="TOGGLE_FILTER_BRANDS(item.name)"
            >
              {{ item.title }}
              <svg
                v-if="item.active"
                width="23px"
                height="23px"
                viewBox="-2.4 -2.4 28.80 28.80"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="okIconTitle"
                stroke="#0878ff"
                stroke-width="0.768"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                color="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_iconCarrier">
                  <title id="okIconTitle">Ok</title>
                  <polyline points="4 13 9 18 20 7"></polyline>
                </g>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const vuexActions = {
  TOGGLE_FILTER_BRANDS: 'glasses/TOGGLE_FILTER_BRANDS',
  TOGGLE_FILTER_GENDERS: 'glasses/TOGGLE_FILTER_GENDERS',
  TOGGLE_FILTER_CATEGORIES: 'glasses/TOGGLE_FILTER_CATEGORIES',
};

const vuexGetters = {
  FILTERS: 'glasses/FILTERS',
};

export default {
  name: 'MobileMenu',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      touchTimeStamp: 0,
      clientX: 0,
    };
  },
  computed: {
    ...mapGetters(vuexGetters),
  },
  methods: {
    ...mapActions(vuexActions),
    closeMenu() {
      this.$emit('closeMenu');
    },
    checkTouchEnd(e) {
      if (e.changedTouches[0].clientX <= -50) {
        if (e.timeStamp - this.touchTimeStamp >= 190) {
          this.closeMenu();
        }
      }
    },
    startTouch(e) {
      this.touchTimeStamp = e.timeStamp;
      this.clientX = e.changedTouches[0].clientX;
    },
  },
};
</script>

<style scoped>
svg {
  position: absolute;
  top: calc(50% - 12px);
}

.hamburger-nav-flex-contain {
  margin-top: 45px;
}

.line {
  width: 45%;
  margin-left: calc(55% - 15px);
  height: 1px;
  background-color: #cacaca;
  margin-bottom: 10%;
  margin-top: -10%;
}

.hamburger {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  /* padding: 25px; */
}

.hamburger-content-contain {
  width: 50%;
  background-color: rgba(255, 255, 255, 1);
  padding: 25px 8px 25px 25px;
  height: 100%;
  overflow-y: scroll;
  -webkit-box-shadow: 0px 0px 32px -4px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 32px -4px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 32px -4px rgba(0, 0, 0, 0.75);
}

.hamburger-close {
  margin: 0px 0 0 calc(48% - 40px);
  background: none;
  border: none;
  opacity: 0.6;
  position: fixed;
}

.hamburger-close > img {
  width: 25px;
}

.hamburger-contain {
  width: 100%;
  display: flex;
  text-align: left;
  flex-flow: column wrap;
}

.hamburger-nav {
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
}

.hamburger-nav-item {
  position: relative;
  width: 100%;
  padding: 8px;
  font-size: 11px;
  transition: 0.5s;
  border: 1px solid transparent;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 0.45em;
  color: #929292;
  text-align: right;
  padding-right: 24px;
}

.checked-contain {
  position: relative;
  z-index: 1;
  margin-right: -25px;
}

.hamburger-nav-contain {
  margin-bottom: 35px;
  width: 100%;
}

.hamburger-nav-contain-brends {
  display: flex;
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;

  margin-bottom: 100px;
}

.hide {
  display: none !important;
}

.selected {
  color: black;
}
/* 
.selected::after {
  content: '';
  background-image: url(https://img.icons8.com/ios/13/0878ff/checkmark.png);
  width: 13px;
  height: 13px;
  position: absolute;
} */

.gender > * {
  font-size: 17px;
}

@media (max-device-width: 345px) {
  .hamburger-nav-item {
    padding: 1%;
  }
}
</style>
