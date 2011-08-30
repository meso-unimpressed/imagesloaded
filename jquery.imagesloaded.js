// $('#my-container').imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// callback function gets image collection as argument
//  `this` is the container

// original: mit license. paul irish. 2010.
// contributors: Yiannis Chatzikonstantinou, David DeSandro
//   Oren Solomianik, Adam J. Sontag, Claudius Coenen

$.fn.imagesLoaded = function( callback ) {
  var urlPattern = /^url\(\s*["']?([^\s"']*)["']?\s*\)$/,
      blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
      $images = this.find('img'),
      $backgroundUrls = findBackgrounds(this),
      _this = this,
      len = $images.length + $backgroundUrls.length;

  function triggerCallback() {
    callback.call( _this, $images, $backgroundUrls );
  }

  function imgLoaded() {
    if ( --len <= 0 && this.src !== blank ){
      setTimeout( triggerCallback );
      $images.unbind( 'load error', imgLoaded );
    }
  }

  function findBackgrounds(jQueryElements) {
    var elemsWithBackground = [];


    jQueryElements.find('.bg-preload').each(function () {
      var element = $(this),
          bg = element.css('background-image');

      if (bg && bg.match(urlPattern)) {
        elemsWithBackground.push(RegExp.$1);
      }
    });
    return $(elemsWithBackground);
  }

  if ( !len ) {
    triggerCallback();
  }

  $images.bind( 'load error',  imgLoaded ).each( function() {
    // cached images don't fire load sometimes, so we reset src.
    if (this.complete || this.complete === undefined){
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = blank;
      this.src = src;
    }
  });

  $backgroundUrls.each(function (index, url) {
	  var image = new Image();
	  image.onload = imgLoaded;
	  image.src = url;
  });

  return this;
};