import { defineStore } from 'pinia';
import glassesList from '~/helpers/glassesList';
import { applyFilters } from './applyFilters';

export const useGlassesStore = defineStore('glasses', {
  actions: {
    /**
     * Fetches sunglasses data
     */
    async FETCH_SUNGLASSES() {
      this.loading = true;

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.sunglassesList = JSON.parse(JSON.stringify(glassesList));
          this.pagination.totalItems = this.sunglassesList.length;

          resolve();
        }, Math.random() * 200);
      }).finally(() => (this.loading = false));
    },

    /**
     * Sets the current page.
     */
    SET_PAGE(page = 1) {
      this.pagination.page = page;
    },

    /**
     * Toggles the active state of the specified gender filter.
     */
    TOGGLE_FILTER_GENDERS(gender: string) {
      const item = this.filters.genders.find((i) => i.name === gender);

      if (item) item.active = !item.active;
    },

    /**
     * Toggles the filter categories based on the provided category.
     */
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

    /**
     * Toggles the active state of a brand filter.
     */
    TOGGLE_FILTER_BRANDS(brand: string) {
      const item = this.filters.brands.find((i) => i.name === brand);

      if (item) {
        item.active = !item.active;
      }
    },

    /**
     * Resets all filters
     */
    RESET_FILTERS() {
      for (const filter in this.filters) {
        this.filters[filter].forEach((item) => (item.active = false));
      }
    },
  },
  state: () => ({
    sunglassesList: [] as Glasses.Item[],
    loading: false,
    pagination: {
      totalItems: 0,
      perPage: 8,
      page: 1,
    },
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

    /**
     * Apply filters to the sunglasses list.
     */
    SUNGLASSES_LIST: (state) => {
      const filteredSunglasses = applyFilters(
        state.filters,
        state.sunglassesList
      );

      const pageIndex = state.pagination.page - 1;
      const from = pageIndex * state.pagination.perPage;
      const to = from + state.pagination.perPage;

      const paginatedSunglasses = filteredSunglasses.slice(
        from,
        to < filteredSunglasses.length ? to : undefined
      );

      return {
        list: paginatedSunglasses,
        pagination: {
          totalItems: filteredSunglasses.length,
          perPage: state.pagination.perPage,
          page: state.pagination.page,
        } satisfies typeof state.pagination,
      };
    },

    ACTIVE_GENDERS: (state) => state.filters.genders,
    ACTIVE_CATEGORIES: (state) => state.filters.categories,
    ACTIVE_BRANDS: (state) => state.filters.brands,

    /**
     * Generates a list of filters
     */
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

/**
 * Finds a filter item in the given array of filters based on the name.
 */
function getFilterItem(filters: Filter[], name: string) {
  return filters.find((f) => f.name === name);
}

/**
 * Hot reloads the store.
 */
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGlassesStore, import.meta.hot));
