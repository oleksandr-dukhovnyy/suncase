export 

export const local_get = key => JSON.parse( window.localStorage.getItem( key ) );
export const local_add = ( key, item )=>{window.localStorage.setItem( key, JSON.stringify( item ) );}