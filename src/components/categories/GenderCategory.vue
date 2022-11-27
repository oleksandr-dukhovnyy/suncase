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

  margin-bottom: 12%;
}
.selected::after {
  content: '';
  background-image: url(https://img.icons8.com/ios/13/000000/checkmark.png);
  width: 13px;
  height: 13px;
  position: absolute;
}
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
