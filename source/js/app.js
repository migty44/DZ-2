$(function () {
    //загружен DOM

    preloader.init();
    slider.init();
    slideShow.init();
    mobMenu.init()



    window.onscroll = function () {

        var wScroll = window.pageYOffset;

        // parallax.deploy();

        parallax.init(wScroll);

    };

});


var mobMenu = (function(){

    var ham = $('.hamburger__link'),
        fsmenu = $('.fsmenu'),
        fsmenuClose = $('.fsmenu__close');


    var movLeft = function ( menu ) {

        menu.stop(true).animate({

            'left': 0

        }, 300);

    }

    return {
        init : function () {

            ham.on('click', function (e) {
                e.preventDefault();

                movLeft( fsmenu );

                console.log('sdcscd');


            });

            console.log('поехали меню');

        }
    }

}());


var preloader = (function () {

    var preloader = $('.preloader'),
        percentsTotal =0;
        imgPath = $('*').map(function (ndx, element) {

            var background = $(element).css('background-image'),
                path = '',
                isImg = $(element).is('img');

            if (background != 'none') {
                path = background.replace('url("', '').replace('")', '');
            }

            if ( isImg ){

                path = $(element).attr('src');

            }

            if (path) return path;

           // return path;
        }); //возвращает объект

    var setPercents = function (total, current) {
        var percents =  Math.ceil( current / total * 100);

        $('.preloader__persentes').text(percents + '%');

        if(percents >= 100){

            preloader.fadeOut();
        }
    }

    var loadImages = function (images) {
        if (!images.length) preloader.fadeOut();

        images.forEach(function (img, i, images) {
            var fakeImage =  $('<img>', {
                attr : {
                    src : img
                }

            });


            fakeImage.on('load error', function () {
                percentsTotal++;
                setPercents(images.length, percentsTotal);

            });
            
        });

    }
    

    return {
        init: function(){

            var imgs = imgPath.toArray();

            loadImages(imgs);

        }
    }
})();


var slider = (function () {

    var counter = 1,
        duration = 300,
        inProcess = false;

    var moveSlide = function (container, direction) {

        var items = $('.slider__item', container),
            activeItem = items.filter('.active'),
            direction = direction == 'down' ? 100 : -100;

        if (counter >= items.length) counter = 0;

        var reqItem = items.eq(counter);

            activeItem.stop(true).animate({

                'top': direction + '%'

            }, duration);

            reqItem.animate({
                'top': '0'
            }, duration, function () {
                activeItem.removeClass('active').css('top', -direction + '%');
                $(this).addClass('active');
                inProcess = false;
            });

    }

    return {

        init : function () {

            $('.slider__controls-top').on('click', function (e) {

                e.preventDefault();

                if(!inProcess) {

                    inProcess = true;

                    moveSlide($('.slider_first'), 'down');
                    moveSlide($('.slider_second'), 'up');

                }

                counter++;


            });
        }
    }
    
})();

var slideShow = (function () {

    return{
        init : function () {

            $('.slideshow__link').on('click', function (e) {
                e.preventDefault();

                var $this = $(this),
                    container = $this.closest('.slideshow'),
                    path = $this.attr('href'),
                    display = container.find('.slideshow__display-pic'),
                    preloader = $('#preloader');

                display.fadeOut(100, function () {
                    preloader.show();
                    display.attr('src', path).on('load', function () {
                        display.fadeIn();
                        preloader.hide()
                    })

                });

            })
        }
    }

})();



/*

$(window).on('load', function () {
    ///загружены картинки и медиа-контент

    console.log('loaded');
    //$('.preloader').fadeOut();
});

$(window).on('scroll', function(){
   console.log($(window).scrollTop());
   console.log($(window).scrollLeft());
});

$(window).on('resize', function (){
    console.log($(window).width());
    console.log($(window).height());

});

*/


var parallax = (function () {

    var bg = document.querySelector('.hero__bg'),
        user = document.querySelector('.hero__container');

    return {

          deploy : function () {

              console.log( bg  );
          },

          move : function (block, windowScroll, strafeAmount){

              var strafe = windowScroll / -strafeAmount + '%',
                  style = block.style,
                  transformString = 'translate3d(-50%,' + strafe + ', 0)';

              //console.log( strafe );

              //style.top = strafe;

              style.transform = transformString;
              style.webkitTransform = transformString;

          },

          init : function (wScroll) {

              this.move( bg, wScroll , 45 );
              this.move( user, wScroll, 5);
          }
      }

})();