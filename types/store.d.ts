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

declare namespace Glasses {
  export type ItemId = string;

  export type Gender = 'woman' | 'man' | 'all';

  export interface Item {
    id: ItemId;
    brand: string; //'Prada',
    model: string; //'PR53US';
    sale: boolean;
    oldCoast: number;
    coast: number;
    gender: Gender;
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
    sunglasessList: Glasses.Item[];
    loading: boolean;
    filters: Filters;
  }
}

declare namespace Cart {
  export type ItemId = string;

  export interface CartItem {
    id: ItemId;
    count: 3;
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
