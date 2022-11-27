<template>
  <div class="filters">
    <button
      v-for="(item, index) of FILTERS.categories"
      :key="index"
      :class="{
        filtersBttn: true,
        selected: item.active,
        'menu-button': true,
        screen: !touchScreen,
      }"
      @click="TOGGLE_FILTER_CATEGORIES(item.name)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const vuexActions = {
  TOGGLE_FILTER_CATEGORIES: 'glasses/TOGGLE_FILTER_CATEGORIES',
};
const vuexGetters = {
  FILTERS: 'glasses/FILTERS',
};

export default {
  name: 'FilterCategory',
  props: ['filterCategies'],
  data() {
    return {
      touchScreen: null,
    };
  },
  computed: {
    ...mapGetters(vuexGetters),
  },
  methods: {
    ...mapActions(vuexActions),
    // selectedIt(category) {
    //   this.$emit('toggledCategory', category);
    // },
  },
  mounted() {
    this.touchScreen =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  },
  // filters: {
  // toNormalName(name) {
  //   let normalNames = {
  //     newActive: 'new',
  //     saleActive: 'sale',
  //     mostPopularActive: 'most popular',
  //     from$to$$$: 'price low to high',
  //     from$$$to$: 'price high to low',
  //   };
  //   for (let prop in normalNames) {
  //     if (name === prop) {
  //       return normalNames[prop];
  //     }
  //   }
  //   console.warn(
  //     `App > Catalog > FilterCategory > filters > toNormalName: name (${name}) is not defined in normalNames (returned no fixed value)`,
  //     normalNames
  //   );
  //   return name;
  // },
  // },
};
</script>

<style>
.filters {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.filtersBttn {
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
  background-image: url(https://img.icons8.com/ios/13/000000/checkmark.jpg);
  width: 13px;
  height: 13px;
  /* z-index: 10; */
  position: absolute;
}
.F_checkmark {
  transition: 0.5s;
  margin-left: -8px;
  margin-right: -13px;
}
.filtersBttn.screen:hover {
  transition: 0.15s;
  color: #565454;
  /* font-size: 13px; */
}
.filtersBttn.selected {
  color: black;
}
</style>
