$(function () {
    //загружен DOM

    //console.log(window);

    preloader.init();

    slider.init();

    //slideShow.init();

    mobMenu.init();

    parallax.init();

    login.init();

});

var slider = (function(){
    var counter = 1,
        duration = 300,
        inProcess = false;

    var moveSlide = function (container, direction) {
        var items = $('.slider__item', container),
            activeItem = items.filter('.active'),
            direction = direction == 'down' ? 100 : -100;

        cszdc = $('.active img', container).attr('src');

        if (counter >= items.length) counter = 0;
        if (counter<0) counter = items.length - 1;

        var reqItem = items.eq(counter);

        activeItem.animate({
            'top' : direction + '%'
        }, duration);

        reqItem.animate({
            'top' : '0'
        }, duration, function () {
            activeItem.removeClass('active').css('top', -direction + '%');
            $(this).addClass('active');
            inProcess = false;
        });

    };

    var display = $('.slider__big_img'),
        preloader = $('#preloader');


    var _changeSlide = function () {

        display.fadeOut(100, function () {
            preloader.show();
            display.attr('src', cszdc).on('load', function () {
                display.fadeIn();
                preloader.hide()
            });
        });
    }



    return {
        init: function () {

            $('.slider__link').on('click', function (e) {
                e.preventDefault();
            })

            $('.slider__controls_top').on('click', function(e){
                e.preventDefault();

                if (!inProcess) {
                    inProcess = true;
                    moveSlide($('.slider_first'), 'down');
                    moveSlide($('.slider_second'), 'up');

                    _changeSlide();
                }

                counter++;

            });

            $('.slider__controls_bot').on('click', function(e){
                e.preventDefault();

                if (!inProcess) {
                    inProcess = true;
                    moveSlide($('.slider_first'), 'up');
                    moveSlide($('.slider_second'), 'down');

                    _changeSlide();
                }

                counter--;

            });
        }
    }
}());


var slideShow11111 = (function () {

    var container = $('.slider__big'),
        display = container.find('.slider__big_img'),
        preloader = $('#preloader');


    var _changeSlide = function (path) {

        display.fadeOut(100, function () {
            preloader.show();
            display.attr('src', path).on('load', function () {
                display.fadeIn();
                preloader.hide()
            });
        });
    }

    var init = function () {

        $('.slider__link').on('click', function (e) {

            e.preventDefault();

            _changeSlide ($(this).attr('href'));

        });

    }

    return{
        init : init
    }

})();


var login = (function () {

    var button = $('.flip__button'),
        submitter = $('#submit'),
        block_hero = $('.hero__container'),
        block_login = $('.hero__login'),
        flipper = $('.hero__flipper'),
        flipVV = 0;


    var _flipe = function () {

        if (!flipVV) {
            flipper.css('transform', 'rotateY(180deg)');
            flipVV = 1;
        } else {
            flipper.css('transform' , 'none' );
            flipVV = 0;
        }


    };


    var _flipe1 = function () {

        var active = flip_toggle == 0 ? block_hero : block_login;
        var noactive = flip_toggle == 1 ? block_hero : block_login;

        active.toggle(200, function () {
            noactive.toggle(200, function () {
                flip_toggle = flip_toggle == 1 ? 0 : 1;
                console.log(flip_toggle );
            });
        });
    }


    var _submite = function (e) {
        e.preventDefault();


        console.log('добавление проекта');

        var form = $(this),
            url = 'add_project.php',
            data = form.serialize();

        console.log(data);

        $.ajax({
            url: url,
            type: 'POST',
            dataType : "json",
            data : data,
            success: function (data, textStatus) {
                $.each(data, function(i, val) {
                    /* ... */
                });
            }
        })

        .done(function (ans) {
            console.log('success');
            console.log(ans);
        })

        .fail(function () {
                console.log('error');
        })

        .always(function () {
                console.log('complete');
        });

    }

    var init = function () {

        button.on('click', _flipe);

        //submitter.on('submit', _submite);

    }

    return{

        init : init

    }
}());


var mobMenu = (function(){

    var ham = $('.hamburger__link'),
        fsmenu = $('.fsmenu'),
        trigger = 0;


    var _movLeft = function ( menu ) {

        //toggle() - меняет display - none на block и наоборот

        menu.stop(true).toggle().animate({

            'left': 0

        }, 300, function () {

            trigger = 1; // перезаписываем глобальную тк нет VAR

            $(document).bind('touchmove', false);
            $("html,body").css("overflow","hidden");
            $('body').addClass('.fixed');

        });

    };

    var _movRight = function ( menu ) {

        menu.stop(true).animate({

            'left': '-100%'

        }, 300, function () {

            trigger = 0;

            $(this).toggle();
            $("html,body").css("overflow","auto");
            $('body').removeClass('.fixed');

            $(document).unbind('touchmove');

        });

    };

    var init = function () {


        ham.on('click', function (e) {
            e.preventDefault();

            if ( !trigger ) {

                _movLeft(fsmenu);


            } else{

                _movRight(fsmenu);

            }

        });


    };

    return {
        init : init
    };

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



    var init = function (wScroll) {

        window.onscroll = function () {

            var wScroll = window.pageYOffset;

            _move(bg, wScroll, 45);
            _move(user, wScroll, 5);

        };

    };


    var _move = function (block, windowScroll, strafeAmount) {

        var strafe = windowScroll / -strafeAmount + '%',
            style = block.style,
            transformString = 'translate3d(-50%,' + strafe + ', 0)';


        style.transform = transformString;
        style.webkitTransform = transformString;

    };

    return {

          init : init

      };

})();