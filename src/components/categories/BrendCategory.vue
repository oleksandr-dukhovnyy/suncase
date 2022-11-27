<template>
  <div class="brends">
    <button
      v-for="(item, i) in FILTERS.brands"
      :key="i"
      :class="{
        brendBttn: true,
        selected: item.active,
        'menu-button': true,
        screen: touchScreen,
      }"
      @click="TOGGLE_FILTER_BRANDS(item.name)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const vuexActions = {
  TOGGLE_FILTER_BRANDS: 'glasses/TOGGLE_FILTER_BRANDS',
};
const vuexGetters = {
  FILTERS: 'glasses/FILTERS',
};

export default {
  name: 'BrendCategory',
  data() {
    return {
      touchScreen: false,
    };
  },
  computed: mapGetters(vuexGetters),
  methods: mapActions(vuexActions),
  mounted() {
    this.touchScreen =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  },
};
</script>

<style>
.brends {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.brendBttn {
  width: 100%;
  font-size: 12px;
  text-align: right;
  border: 1px solid transparent;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 0.45em;
  color: #999;
  transition: 2s;

  margin-bottom: 12%;
}
.selected::after {
  content: '';
  background-image: url(https://img.icons8.com/ios/13/000000/checkmark.png);
  width: 13px;
  height: 13px;
  /* z-index: 10; */
  position: absolute;
}
.brendBttn.screen:hover {
  transition: 0.15s;
  color: #565454;
}
.brendBttn.selected {
  color: black;
}
.B_checkmark {
  margin-left: -8px;
  margin-right: -13px;
}
</style>
