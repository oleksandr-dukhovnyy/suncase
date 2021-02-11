export const LocalStTool = {
    _get: key => JSON.parse( window.localStorage.getItem( key ) ),
    _add: ( key, item )=> window.localStorage.setItem( key, JSON.stringify( item ) )
}