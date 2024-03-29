declare namespace Localization {
  export interface Locale {
    filters: {
      genders: {
        man: string;
        woman: string;
        kids: string;
      };
      categories: {
        new: string;
        sale: string;
        'most-popular': string;
        'price-low-to-hight': string;
        'price-hight-to-low': string;
      };
    };

    cta: {
      'action-button': string;
      buy: string;
      'buy-all': string;
      'add-to-cart': string;
      slogan: string[];
    };

    cart: {
      'cart-is-empty': string;
      'delete-item': string;
    };

    location: string;

    'pagination-pages': string[];
  }

  export interface Lang {
    value: 'en-US' | 'uk-UA';
    selected: boolean;
    title: string;
    documentLanguagesValue?: string;
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
    sold: number; //1343;
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
