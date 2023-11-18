declare namespace Store {
  export interface Actions {
    [key: string]: (api: any, payload: any) => void;
  }

  export interface Mutations<State> {
    [key: string]: (state: State, payload: any) => void;
  }

  export interface Getters<S, T> {
    [key: string]: (
      state: S,
      localGetters: T,
      rootState: any,
      rootGetters: any
    ) => void;
  }
}

declare interface Filter {
  [index: string]: string | boolean;
  name: string;
  active: boolean;
}

declare type FiltersList = {
  type: string;
  items: {
    title: string;
    name: string;
    active: boolean;
  }[];
}[];

declare namespace Glasses {
  export interface Item {
    id: string;
    brand: string; //'Prada',
    model: string; //'PR53US';
    sale: boolean;
    oldCoast: number;
    coast: number;
    gender: 'woman' | 'man' | 'all';
    saled: number; //1343;
    isNew: boolean;
    lng: number; // count of images on store. Needs for carousel
  }

  export interface Filters {
    [index: string]: Filter[];
    genders: Filter[];
    categories: Filter[];
    brands: Filter[];
  }

  export interface State {
    SUNGLASSESList: Glasses.Item[];
    loading: boolean;
    filters: Filters;
  }
}

declare namespace Cart {
  export interface CartItem {
    id: string;
    count: number;
  }

  export interface State {
    cart: CartItem[];
    showCartPopup: boolean;
  }
}

declare namespace Slider {
  export interface State {
    show: boolean;
    selected: string | null;
  }
}
