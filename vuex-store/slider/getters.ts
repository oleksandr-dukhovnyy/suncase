export default <Store.Getters<Slider.State, any>>{
  SLIDER_SHOW: (state) => state.show,
  SELECTED_ITEM: (state, _, __, globalGetters) => {
    const item =
      globalGetters['glasses/UNFILTERED_SUNGLASSES_LIST'].find(
        (item: Glasses.Item) => item.id === state.selected
      ) || null;

    return {
      item,
      defined: item !== null,
    };
  },
};
