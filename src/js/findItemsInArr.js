export const findItemsInArr = ( finds, findIn ) => {
    let unswer = [];
    finds.forEach( item => {
        findIn.forEach( _item => {
            if( item == _item.id ){
                unswer.push( _item );
            }
        });
    });
    console.log( unswer );
    
    return unswer;
}