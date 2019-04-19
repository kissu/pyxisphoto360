(function ($) {
  $.fn.extend({
    vc3dEye: function (params) {
      vc3dEye(this.selector, params);
      return
    }
  });

  var vc3dEye = function (selectorName, params) {
    this.selector = $(selectorName);
    this.isMoving = false;
    this.currentX = 0;
    this.currentImage = 0;
    this.reversed = params.reversed === true ? 1 : -1 || -1;
    this.images = params.images;

    function assignOperations() {
      selector.mousedown(function (target) {
        isMoving = true;
        currentX = target.pageX - this.offsetLeft;
      });

      $(document).mouseup(function () {
        isMoving = false;
      });

      selector.mousemove(function (target) {
        if (isMoving == true) {
          loadAppropriateImage(reversed * (target.pageX - this.offsetLeft));
        }
      });

      selector.bind("touchstart", function (target) {
        isMoving = true;
        var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
        currentX = actualTouch.clientX;

      });

      $(document).bind("touchend", function () {
        isMoving = false;
      });

      selector.bind("touchmove", function (target) {
        target.preventDefault();
        var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
        if (isMoving == true)
          loadAppropriateImage(reversed * (actualTouch.pageX - this.offsetLeft));
        else
          currentX = actualTouch.pageX - this.offsetLeft
      })
    }

    function loadAppropriateImage(newX) {
      if (currentX - newX > 25) {
        currentX = newX;
        currentImage = --currentImage < 1 ? images.length : currentImage;
        selector.css("background-image", "url(" + images[currentImage - 1] + ")");
      } else if (currentX - newX < -25) {
        currentX = newX;
        currentImage = ++currentImage > images.length ? 1 : currentImage;
        selector.css("background-image", "url(" + images[currentImage - 1] + ")");
      }
    }

    function forceLoadAllImages() {
      selector.css("background-image", "url(" + images[0] + ")");
      $("<img/>").attr("src", images[0]).load(function () {
        selector.height(this.height).width(this.width);
      });
    }

    function loadTheRemainingImages(index) {
      selector.append("<img src='" + images[index] + "' style='display:none;'>");
    }

    function initializeOverlayDiv() {
      $("html").append("<style type='text/css'>.onLoadingDiv{background-color:#000000;opacity:0.5;text-align:center;font-size:2em;font:color:#ffffff;}</style>")
      $(selector).html("<div id='VCc' style='height:100%;width:100%;' class='onLoadingDiv'><br/><br/>Chargement...</div>");
    }

    var callCount = 0;
    var repeater = setInterval(function () {
      if (callCount < images.length) {
        loadTheRemainingImages(callCount);
        callCount += 1;
      } else {
        clearInterval(repeater);
        $("#VCc").removeClass("onLoadingDiv");
        $("#VCc").text("")
      }
    }, 100);

    initializeOverlayDiv();
    forceLoadAllImages();
    loadAppropriateImage();
    assignOperations();
  }


})(jQuery);
