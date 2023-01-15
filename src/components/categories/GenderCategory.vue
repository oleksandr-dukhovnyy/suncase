<template>
  <div class="gender">
    <button
      v-for="(item, i) in FILTERS.genders"
      :key="i"
      class="genderBttn"
      :class="{
        selected: item.active,
        screen: !touchScreen,
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const vuexActions = {
  TOGGLE_FILTER_GENDERS: 'glasses/TOGGLE_FILTER_GENDERS',
};

const vuexGetters = {
  FILTERS: 'glasses/FILTERS',
};

export default {
  name: 'GenderCategory',
  data() {
    return {
      touchScreen: null,
    };
  },
  methods: mapActions(vuexActions),
  computed: mapGetters(vuexGetters),
  mounted() {
    this.touchScreen =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  },
};
</script>

<style>
.gender {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.gender svg {
  position: absolute;
  top: calc(50% - 12px);
}

.genderBttn {
  width: 100%;
  font-size: 18px;
  text-align: right;
  border: 1px solid transparent;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 0.45em;
  color: #999;
  transition: 2s;
  position: relative;

  margin-bottom: 12%;
}
/* .selected::after {
  content: '';
  background-image: url(https://img.icons8.com/ios/13/0878ff/checkmark.png);
  width: 13px;
  height: 13px;
  position: absolute;
} */
.G_checkmark {
  margin-left: -13px;
  margin-right: -13px;
}
.genderBttn.screen:hover {
  /* font-size: 19px; */
  transition: 0.15s;
  color: #565454;
}
.genderBttn.selected {
  color: black;
}
</style>
