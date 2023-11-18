import { defineStore } from 'pinia';
import { useGlassesStore } from '~/store/glasses';

// @ts-ignore
import openWin from '../../helpers/openPayWindow.js';
// @ts-ignore
import bodyScroll from '../../helpers/bodyScroll.js';

export const useSliderStore = defineStore('slider', {
  actions: {
    SET_SLIDER_SHOW(show: boolean) {
      this.show = show;
      bodyScroll.balancedSet(show);
    },
    TOGGLE_SLIDER_SHOW() {
      this.SET_SLIDER_SHOW(!this.show);
    },
    HIDE_SLIDER() {
      this.SET_SLIDER_SHOW(false);
    },
    SHOW_SLIDER() {
      this.SET_SLIDER_SHOW(true);
    },
    SET_SELECTED(id: Glasses.Item['id']) {
      this.selected = id;
    },
    BUY_IT(id: Glasses.Item['id']) {
      const glassesStore = useGlassesStore();

      const item = glassesStore.UNFILTERED_SUNGLASSES_LIST.find(
        ({ id: itemId }) => itemId === id
      );

      if (item) {
        openWin(item, 1, () => {
          this.show = false;
        });
      } else {
        console.error(`item (id === ${id}) not found`);
      }
    },
  },
  state: () => ({
    show: false,
    selected: null as Glasses.Item['id'] | null,
  }),
  getters: {
    SLIDER_SHOW: (state) => state.show,
    SELECTED_ITEM(state): {
      item: Glasses.Item | null;
      defined: boolean;
    } {
      const glassesStore = useGlassesStore();

      const item =
        glassesStore.UNFILTERED_SUNGLASSES_LIST.find(
          (item: Glasses.Item) => item.id === state.selected
        ) || null;

      return {
        item,
        defined: item !== null,
      };
    },
  },
});
