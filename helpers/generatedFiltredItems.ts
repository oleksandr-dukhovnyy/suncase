const SHOW_LOGS = false;

/**
 * Filters an array of items based on the provided configuration and gender.
 */
export const generatedFilteredItems = (
  config: {
    brandsActive: string[];
    newActive: boolean;
    saleActive: boolean;
    mostPopularActive: boolean;
    from$to$$$: boolean;
    from$$$to$: boolean;
    allGenderCategory: string[];
    allBrands: string[];
  },
  arr: Glasses.Item[],
  genderActive: string[]
) => {
  let filteredItems: Glasses.Item[] = [];
  let {
    brandsActive,
    newActive,
    saleActive,
    mostPopularActive,
    from$to$$$,
    from$$$to$,

    allGenderCategory,
    allBrands,
  } = config;

  if (SHOW_LOGS)
    console.log(
      `
        brandsActive - ${typeof brandsActive}
        genderActive - ${typeof genderActive}
        newActive - ${typeof newActive}
        mostPopularActive - ${typeof mostPopularActive}
        from$to$$$ - ${from$to$$$}
        allGenderCategory - ${allGenderCategory.join(', ')}
        allBrands - ${allBrands.join(', ')}
      `
    );

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item === undefined || item === null) break;

    let deleIt = false;
    let pushIt = false;

    if (newActive === true) {
      if (item.isNew === true) {
        pushIt = true;
      } else {
        deleIt = true;
      }
    }

    if (saleActive === true) {
      if (item.sale === true) {
        pushIt = true;
      } else {
        deleIt = true;
      }
    }

    if (brandsActive.length === allBrands.length || brandsActive.length === 0) {
      pushIt = true;
    } else if (selectPropFromArr(item, brandsActive, 'brand')) {
      pushIt = true;
    } else if (brandsActive[0] === '') {
      pushIt = true;
    } else {
      deleIt = true;
    }

    if (
      genderActive.length === allGenderCategory.length ||
      genderActive.length === 0
    ) {
      pushIt = true;
    } else if (selectPropFromArr(item, genderActive, 'gender')) {
      pushIt = true;
    } else if (genderActive[0] === '') {
      pushIt = true;
    } else {
      deleIt = true;
    }

    if (pushIt && !deleIt) {
      filteredItems.push(item);
    }
  }

  if (mostPopularActive) {
    filteredItems.sort((a, b) => (b.sold > a.sold ? 1 : -1));
  }

  if (from$to$$$) {
    filteredItems.sort((a, b) => (a.coast > b.coast ? 1 : -1));
  } else if (from$$$to$) {
    filteredItems.sort((a, b) => (b.coast > a.coast ? 1 : -1));
  }

  return filteredItems;
};

// support funks
function selectPropFromArr(
  item: Glasses.Item,
  PropArr: string[],
  neededProp: string
) {
  return PropArr.indexOf(item[neededProp]) !== -1 || item[neededProp] === 'all';
}
