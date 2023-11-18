import { defineStore } from 'pinia';
import glassesList from '~/helpers/glassesList';
import applyFilters from './applyFilters';

export const useGlassesStore = defineStore('glasses', {
  actions: {
    FETCH_SUNGLASSES() {
      this.loading = true;

      setTimeout(() => {
        this.sunglassesList = JSON.parse(JSON.stringify(glassesList));
        this.loading = false;
      }, Math.random() * 200);
    },
    TOGGLE_FILTER_GENDERS(gender: string) {
      const item = this.filters.genders.find((i) => i.name === gender);

      if (item) item.active = !item.active;
    },
    TOGGLE_FILTER_CATEGORIES(category: string) {
      const item = this.filters.categories.find((i) => i.name === category);

      if (category === 'price-low-to-hight') {
        const priceHightToLow = getFilterItem(
          this.filters.categories,
          'price-hight-to-low'
        );

        if (priceHightToLow) {
          priceHightToLow.active = false;
        }
      } else if (category === 'price-hight-to-low') {
        const priceLowToHight = getFilterItem(
          this.filters.categories,
          'price-low-to-hight'
        );

        if (priceLowToHight) {
          priceLowToHight.active = false;
        }
      }

      if (item) {
        item.active = !item.active;
      }
    },
    TOGGLE_FILTER_BRANDS(brand: string) {
      const item = this.filters.brands.find((i) => i.name === brand);

      if (item) {
        item.active = !item.active;
      }
    },
  },
  state: () => ({
    sunglassesList: [] as Glasses.Item[],
    loading: false,
    filters: {
      genders: [
        { name: 'man', active: false },
        { name: 'woman', active: false },
        { name: 'kids', active: false },
      ],
      categories: [
        { name: 'new', active: false },
        { name: 'sale', active: false },
        { name: 'most-popular', active: false },
        { name: 'price-low-to-hight', active: false },
        { name: 'price-hight-to-low', active: false },
      ],
      brands: [
        { name: 'Levis', active: false },
        { name: 'Prada', active: false },
        { name: 'Oakley', active: false },
        { name: 'Persol', active: false },
        { name: 'Versace', active: false },
        { name: 'Ray-Ban', active: false },
        { name: 'Polaroid', active: false },
        { name: 'Maui Jim', active: false },
        { name: 'Saint Laurent', active: false },
        { name: 'Christian Dior', active: false },
      ],
    } as Glasses.Filters,
  }),
  getters: {
    SUNGLASSES_LOADING: (state) => state.loading,
    SUNGLASSES_LIST: (state) =>
      applyFilters(state.filters, state.sunglassesList),
    ACTIVE_GENDERS: (state) => state.filters.genders,
    ACTIVE_CATEGORIES: (state) => state.filters.categories,
    ACTIVE_BRANDS: (state) => state.filters.brands,
    FILTERS: (state) => {
      const filters = [] as FiltersList;

      for (let filterType in state.filters) {
        filters.push({
          type: filterType,
          items: state.filters[filterType].map((item) => ({
            ...item,
            title: item.name.replace(/-/g, ' '),
          })),
        });
      }

      return filters;
    },
    UNFILTERED_SUNGLASSES_LIST: (state) => state.sunglassesList,
  },
});

function getFilterItem(filters: Filter[], name: string) {
  return filters.find((f) => f.name === name);
}
