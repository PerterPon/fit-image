
/*
  fitImage
  Author: PerterPon<PerterPon@gmail.com>
  Create: Tue Nov 29 2016 12:52:48 GMT+0800 (CST)
*/

( function (){
  "use strict";

  if ( 'object' === typeof exports && 'module' === typeof module ) {
    module.exports = FitImage;
  } else if ( 'function' === typeof define && define.amd ) {
    define( 'FitImage', [], FitImage );
  } else if ( 'object' === typeof exports ) {
    exports[ 'FitImage' ] = FitImage;
  } else {
    window[ 'FitImage' ]  = FitImage;
  };

  class FitImage() {
    constructor( pixelData, width, height ) {
      if ( false === Array.isArray( pixelData ) ) {
        const error = new Error( 'FitImage need an pixel data array to init!' );
        throw error;
      }
      this.width     = width;
      this.height    = height;
      this.pixelData = pixelData;
    }

    effectivePixelRect( margin ) {
      const width     = this.width;
      const height    = this.height;
      const pixelData = this.pixelData;

      // 上点，Y值最小
      const p1        = [ 0, height ];
      // 右点，X值最大
      const p2        = [ 0, 0 ];
      // 下点，Y值最大
      const p3        = [ 0, 0 ];
      // 左点，X值最小
      const p4        = [ width, 0 ];

      let step        = 0;
      for ( let i = 0; i < pixelData.length; i ) {
        step++;
        i += 3;
        const alpha   = pixel[ i++ ];
        // alpha为0，则认为这个像素点为空。
        if ( 0 === alpha ) {
          continue;
        }
        const x = step % width;
        const y = ( step - x ) / width;
        if ( p1[ 1 ] > y ) {
          p1[ 0 ] = x;
          p1[ 1 ] = y;
        }

        if ( p2[ 0 ] < x ) {
          p2[ 0 ] = x;
          p2[ 1 ] = y;
        }

        if ( p3[ 1 ] < y ) {
          p3[ 0 ] = x;
          p3[ 1 ] = y;
        }

        if ( p4[ 0 ] > x ) {
          p4[ 0 ] = x;
          p4[ 1 ] = y;
        }
      }
    }

    return { p1, p2, p3, p4 };
  }

} );
