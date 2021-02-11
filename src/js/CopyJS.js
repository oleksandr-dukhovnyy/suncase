'use strict'
class _Copy {
  constructor( config = null ){
    this.config = {
      name: 'DefaultInstance',
      loggingErrors: true,
      loggingWarns: true,
      loggingMsg: false,
      prefix: `CopyJS`,
    }
    if( config !== null ){
      this._configurate( config );
    }

    this._configurate.bind( this );
    this._arr.bind( this );
    this._arrDeep.bind( this );
    this._obj.bind( this );
    this._objDeep.bind( this );
  }
  _configurate( config ){
    Object.assign( this.config, config );
    if( this.config.loggingMsg ) { console.log(`\n\n${this.config.prefix} configurated\n`, this.config, '\n\n' );}
  }
  _arr( arr ){
    // Easy copy
    // if you need to copy array with objects - use _arrDeep
    return [...arr];
  }
  _arrDeep( arr ){
    return [...arr];
  }
  _objDeep( obj ){
    return {...obj};
  }
  _obj( obj = null ){
    // Easy copy
    // if you need to copy object with objects - use _objDeep
    if( obj === null ){ console.warn( `function copyObj: object === null` ); }
    return Object.assign({}, obj);
  }
}

const deepFreeze = obj => {
    const propNames = Object.getOwnPropertyNames( obj );
    propNames.forEach( name => {
      const prop = obj[ name ];
      if ( typeof prop == 'object' && prop !== null )
        deepFreeze( prop );
    });
    return Object.freeze( obj );
}

export const Copy = new _Copy();