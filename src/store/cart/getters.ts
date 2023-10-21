type CounteredGlassesItem = Cart.CartItem & Glasses.Item;

const getters: Store.Getters<Cart.State, any> = {
  CART: (state, _, __, rootGetters): CounteredGlassesItem => {
    return rootGetters['glasses/UNFILTERED_SUNGLASESS_LIST']
      .filter((item: Glasses.Item) =>
        state.cart.find(({ id }) => '' + item.id === '' + id)
      )
      .map((item: Cart.CartItem) => ({
        ...item,
        count:
          state.cart.find(({ id }) => '' + item.id === '' + id)?.count || 0,
      }));
  },
  CART_LENGTH: (_, getters): number =>
    getters.CART.reduce(
      (acc: number, curr: CounteredGlassesItem) => acc + curr.count,
      0
    ),
  CART_TOTAL_PRICE: (_, getters): number =>
    getters.CART.reduce(
      (a: number, c: CounteredGlassesItem) => a + c.coast * c.count,
      0
    ),
  SHOW_CART_POPUP: (state) => state.showCartPopup,
};

export default getters;
