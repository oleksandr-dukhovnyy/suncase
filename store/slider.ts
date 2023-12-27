import { defineStore } from 'pinia';
import { useGlassesStore } from '~/store/glasses';

import { openWin } from '~/helpers/openPayWindow';
import bodyScroll from '~/helpers/bodyScroll';

export const useSliderStore = defineStore('slider', {
  actions: {
    /**
     * Sets the value of the 'show' property and calls the 'balancedSet' function from the 'bodyScroll' object.
     */
    SET_SLIDER_SHOW(show: boolean) {
      this.show = show;
      bodyScroll.balancedSet(show);
    },

    /**
     * Toggles the value of `show` and calls `SET_SLIDER_SHOW` with the new value.
     */
    TOGGLE_SLIDER_SHOW() {
      this.SET_SLIDER_SHOW(!this.show);
    },

    /**
     * Hides the slider.
     */
    HIDE_SLIDER() {
      this.SET_SLIDER_SHOW(false);
    },

    /**
     * Shows the slider.
     */
    SHOW_SLIDER() {
      this.SET_SLIDER_SHOW(true);
    },

    /**
     * Sets the selected ID for the Glasses item.
     */
    SET_SELECTED(id: Glasses.Item['id']) {
      this.selected = id;
    },

    /**
     * Buy the selected glasses.
     */
    BUY_IT(id: Glasses.Item['id']) {
      const glassesStore = useGlassesStore();

      const item = glassesStore.UNFILTERED_SUNGLASSES_LIST.find(
        ({ id: itemId }) => itemId === id
      );

      if (item) {
        openWin(item, 1, () => {
          // Close slider modal
          this.show = false;

          // ...and add body scroll
          bodyScroll.add();
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

    /**
     * Retrieves the selected item from the glasses store.
     */
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
