export const generatedFiltredItems = ( config, arr, genderActive ) => {
    const settings = {
        showLogs: false
    }


    let filtredItems = [];
    let {
        brandsActive,
        newActive,
        saleActive,
        mostPopularActive,
        from$to$$$,
        from$$$to$,
        showLength,

        allGenderCategory,
        allBrends
        
    } = config;

    // bugfix log
    // console.clear();

    if( settings.showLogs ){
        console.log(`
            brandsActive - ${ typeof brandsActive}
            genderActive - ${ typeof genderActive}
            newActive - ${ typeof newActive}
            mostPopularActive - ${ typeof mostPopularActive}
            from$to$$$ - ${from$to$$$}
            allGenderCategory - ${allGenderCategory.join( ', ' )}
            allBrends - ${allBrends.join( ', ' )}
        `);
    }
    
        for ( let i = 0; i < arr.length; i++ ) {
            let item = arr[i];
            if( item === undefined || item === null ) break;


            let deleIt = false;
            let pushIt = false;

            if( newActive === true ){
                if( item.isNew === true ){
                    pushIt = true;
                } else {
                    deleIt = true;
                }
            }

            if( saleActive === true ){
                if( item.sale === true ){
                    pushIt = true;
                } else {
                    deleIt = true;
            }
        }

        if( brandsActive.length === allBrends.length || brandsActive.length === 0 ){
            pushIt = true;
        } else if( selectPropFromArr( item, brandsActive, 'brend' ) ){
            pushIt = true;

        } else if( brandsActive[0] === '' ){
            pushIt = true;
        } else {
            deleIt = true;
        }
        
        if( genderActive.length === allGenderCategory.length || genderActive.length === 0 ){
            pushIt = true;
        } else if( selectPropFromArr( item, genderActive, 'gender' ) ){
            pushIt = true;
        } else if( genderActive[0] === '' ){
            pushIt = true;
        } else {            
            deleIt = true;
        }
        
        if( pushIt && !deleIt ){    
            filtredItems.push( item );
        }
    }

    if( mostPopularActive ){
        filtredItems.sort( (a, b) => b.saled > a.saled ? 1 : -1);
    }

    if( from$to$$$ ){
        filtredItems.sort( (a, b) => a.coast > b.coast ? 1 : -1); 
    } else if( from$$$to$ ){
        filtredItems.sort( (a, b) => b.coast > a.coast ? 1 : -1);
    }


    if( filtredItems.length > showLength ){
        filtredItems = filtredItems.slice( 0 , showLength );
    }
    return filtredItems;

} // end middle sort function

// support funks: 
const selectPropFromArr = ( item, PropArr, neededProp ) => {
    if( PropArr.indexOf( item[neededProp] ) !== -1 ){
        return true;
    } else if( item[neededProp] === 'all' ){
            return true;
    } else {
        return false;
    }
}