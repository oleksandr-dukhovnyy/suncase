// @ts-ignore
import bodyScroll from '../../js/bodyScroll.js';

export default <Store.Mutations<Slider.State>>{
  SET_SLIDER_SHOW(state, bool) {
    bodyScroll.set(bool);

    state.show = bool;
  },
  SET_SELECTED(state, id) {
    state.selected = id;
  },
};
