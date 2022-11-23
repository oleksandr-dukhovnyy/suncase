<template>
  <section class="first-screen">
    <!-- LOGO -->
    <div class="logo">
      <span class="logo-text"> suncase </span>
      <span class="support-text"> original shop </span>
    </div>

    <!-- MENU -->
    <div class="menu">
      <div class="menu-buttons-contain">
        <button @click="toggledCategory('man')">man</button>
        <button @click="toggledCategory('woman')">woman</button>
        <button @click="toggledCategory('kids')">kids</button>
      </div>
    </div>

    <!-- LINE SLIDER -->
    <FirstRow @browse="toggledCategory()" />
  </section>
</template>

<script>
// funcs
import scrollToGoods from '../../js/scrollToGoods.js';

// components
import FirstRow from './FirstRow.vue';

// vuex
import { mapActions } from 'vuex';

const vuexActions = {
  TOGGLE_FILTER_GENDERS: 'glasses/TOGGLE_FILTER_GENDERS',
};

export default {
  name: 'FirstScreen',
  components: {
    FirstRow,
  },
  methods: {
    ...mapActions(vuexActions),
    toggledCategory(category = null) {
      if (category !== null) {
        this.TOGGLE_FILTER_GENDERS(category);
      }

      scrollToGoods();
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Jaapokki subtract Regular';
  src: url('../../../public/fonts/Jaapokkisubtract-Regular.otf');
}

.first-screen {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: -68px;
  overflow: hidden;
}

.logo {
  margin: auto;
  width: max-content;
  z-index: 5;
  padding-left: 40px;
}

.logo * {
  text-transform: uppercase;
}

.logo-text {
  width: max-content;
  position: relative;
  display: block;
  font-weight: 600;
  letter-spacing: 0.5em;
  font-size: 25px;
  z-index: 4;
  padding-left: 3%;
}
.support-text {
  position: relative;
  font-size: 12px;
  letter-spacing: 0.45em;
}

.logo-text::before {
  content: '';
  display: block;
  width: 42px;
  background-repeat: no-repeat;
  height: 42px;
  background-image: url('../../../public/favicons/new/6.png');
  position: absolute;
  left: -1.9em;
  top: 1px;
  background-size: contain;
}

.menu {
  padding: 0 30px;
  margin: 45px auto 50px auto;
}
.menu button {
  border: none;
  background-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.5em;
  margin-top: 12px;
  /* border: 1px solid orangered; */
}

.menu button:hover {
  cursor: pointer;
}

.menu-buttons-contain {
  display: flex;
  width: 316px;
  justify-content: space-between;
  margin: auto;
}

@media (max-device-width: 750px) {
  .logo {
    z-index: 1;
  }
  .first-screen {
    margin-top: 50px;
  }
}

@media (max-device-width: 460px) {
  .menu-buttons-contain {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .menu-buttons-contain button {
    width: 100%;
    padding: 25px;
  }
  .phone-number::after {
    content: '';
  }
}
</style>
