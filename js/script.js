function menuTop() {
    $('.jsopener>a>i').click(function(e) {
        var a = $(window).width();
        var heim = $('.menulev2').height();
        console.log(heim);
        $('.topnav .tnav.bef:after').css('height', heim);
        if (a < 992) {
            e.preventDefault();
            var b = $(this).closest('.jsopener').attr('data-tumb');
            if (b == '1') {
                $(this).closest('ul').find('.menulev2').slideUp(0);
                $(this).closest('ul').find('.jsopener').attr('data-tumb', 1);
                $(this).closest('ul').find('.jsopener').removeClass('active');
                $(this).closest('.jsopener').addClass('active');
                $(this).closest('.jsopener').find('>.menulev2').slideDown();
                var b = $(this).closest('.jsopener').attr('data-tumb', 0);
                $('.tnav').toggleClass('bef');
                $('.tnav').removeClass('bef2');
                $('.tnav').removeClass('bef3');
            } else {
                $(this).closest('.jsopener').find('>.menulev2').slideUp();
                var b = $(this).closest('.jsopener').attr('data-tumb', 1);
                $(this).closest('.jsopener').removeClass('active');
                $('.tnav').toggleClass('bef');
                $('.tnav').removeClass('bef2');
                $('.tnav').removeClass('bef3');
            }
        } else {
            $(this).closest('ul').find('.submenuli > .menulev2').slideToggle();
            $(this).closest('.jsopener').toggleClass('active');
            $('.tnav').toggleClass('bef');
            $('.tnav').removeClass('bef2');
            $('.tnav').removeClass('bef3');
        }
    });

    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $(".submenuli"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.jsopener').removeClass('active');
            $('.jsopener').attr('data-tumb', 1);
            $('.jsopener').find('>.menulev2').slideUp();
            $('.tnav').removeClass('bef');
        }
    });

    $('.topnav .tnav > li').has('.sub-menu').find('> a').append('<i></i>');

    var parentLi = $('.el5val .el5nav .sub-menu').prev('a').addClass('parent').append('<i></i>');
    parentLi.click(function(e) {
        e.preventDefault();
        $(this).next('.sub-menu').slideToggle(200);
        $(this).siblings('a').find('.sub-menu').slideUp(200);
    });
}

function openMobInform() {
    $('.btninform').click(function() {
        $('.el5val').slideToggle();
        $(this).toggleClass('active');
        $('.tnav').toggleClass('bef2');
        $('.tnav').removeClass('bef');
        $('.tnav').removeClass('bef3');
    });

    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $(".el5val,.btninform"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.btninform').removeClass('active');
            $('.el5val').slideUp();
            $('.tnav').removeClass('bef2');
        }
    });
}

function priceOnNav() {
    $('.js-price-btn').click(function() {
        $('.hpricelist').slideToggle();
        $(this).closest('.callback').toggleClass('active');
        $('.tnav').toggleClass('bef3');
    });

    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $(".callback,.hpricelist"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.callback').removeClass('active');
            $('.hpricelist').slideUp();
            $('.tnav').removeClass('bef3');
        }
    });
}

function headMobContact() {
    $('.js-mobconinfo').click(function() {
        $('.header-contact-mob').slideDown();
    });
    $('.js-close .btn').click(function() {
        $('.header-contact-mob').slideUp();
    });

    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $(".header-contact-mob,.js-mobconinfo,.modal"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.header-contact-mob').slideUp();
        }
    });
}

function widthMobMnu() {
    var a = $(window).width();
    if (a < 993) {
        $('.submenuli>ul').css('width', a);
    }
}

function menuBars() {
    $('.c-hamburger').click(function(e) {
        e.preventDefault();
        $('.c-hamburger').toggleClass('is-active');
        $('.b2').toggleClass('active');
    });
}

function slidersInit() {
    // $('.mslslick').slick({
    // 	infinite: true,
    // 	arrows: true
    // });

    $('.itsl').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.itsl-nav'
    });

    $('.itsl-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.itsl',
        arrows: false,
        dots: false,
        focusOnSelect: true
    });

    $('.company-slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        focusOnSelect: true
    });

    $('.lookgoods .df').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        focusOnSelect: true,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
    $('.partners .unitsmob').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        focusOnSelect: true,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });


}

function upScroll() {
    var a = $(window).height();
    $(window).scroll(function() {
        if ($(this).scrollTop() > a) {
            $('.upper').fadeIn();
        } else {
            $('.upper').fadeOut();
        }
    });
    $('.upper').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });
}

function btnPartners() {
    $('.btnall').click(function() {
        $(this).find('span').toggleClass('act');
        $('.partners .elwr:nth-child(n+6)').slideToggle();
    });
}


function categoryMenu() {
    $('.jsop').click(function() {
        var a = $(this).attr('data-li');
        if (a == '1') {
            $(this).closest('ul').find('li ul').slideUp();
            $(this).closest('li').find('>ul').slideUp();
            $(this).closest('ul').find('.jsop').attr('data-li', 0);
            $(this).closest('ul').find('.jsop').removeClass('active');
            $(this).removeClass('active');
            $(this).attr('data-li', 0);
        } else {
            $(this).closest('ul').find('li ul').slideUp();
            $(this).closest('li').find('>ul').slideDown();
            $(this).closest('ul').find('.jsop').attr('data-li', 0);
            $(this).attr('data-li', 1);
            $(this).closest('ul').find('.jsop').removeClass('active');
            $(this).addClass('active');
        }
    });
}

function brandOpen() {
    $('.jscheckers').click(function() {
        $(this).find('span').toggleClass('noact');
        $(this).closest('.checkers').find('.brandcheck:nth-child(n+13)').toggleClass('open');
    });
}

function filterOpen() {
    $('.js-filter').click(function() {
        $(this).toggleClass('active');
        $(this).find('span').toggleClass('noact');
        $('.valwr .val').slideToggle();
    });
}

function inputFileReset() {
    $('.removefile').click(function() {
        $(this).removeClass('active');
        $(this).closest('.flexinputfile').find('input').val("");
        $(this).closest('.flexinputfile').find('span').text("");
        $('.flexinputfile').removeClass('hij');
    });
}

function mapTabs() {
    $('.contact-tab .btn:not(.active)').click(function() {
        $('.contact-tab .btn').removeClass('active str');
        $(this).addClass('active');
        var a = $(this).attr('data-tabr');
        $('.tabc').slideUp();
        $('.tabc' + a).slideDown();
    });
}

function widthDotsCompany() {
    var a = $('.company-slick').length;
    if (a) {
        var b = $('.slick-dots li').length;
        var c = (b * 15) + 80;
        var d = c / 2;
        $('.slick-prev').css('margin-left', -d);
        $('.slick-next').css('margin-right', -d);
        console.log(a);
    }
}

function searchOpen() {
    $('.js-selopen').click(function() {
        $(this).toggleClass('active');
        $('.selval').slideToggle();
    });

    $('.selval label').click(function() {
        $('.selval label').removeClass('hidel');
        $(this).addClass('hidel');
        var a = $(this).text();
        $('.js-selopen span').text(a);
        $('.selval').slideUp();
        $(this).removeClass('active');
    });
}

function searchOpener() {
    $('.js-opener').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).closest('.hsearch').find('form').toggleClass('open');
    });
}

function advSlider() {
    $('.mobslider').slick({
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            dots: false,
            fade: true,
            focusOnSelect: true,
        }
    });
}

function footerFixed() {
    var c = 0;
    var a = $('.page-wrapper').height();
    var b = $(window).height();
    var c = $('.footer').height();
    console.log(a);
    console.log(b);
    console.log(c);
    if (c > 0) {
        var d = +a + c + 17 - b;
    } else {
        var d = +a + 17 - b;
    }
    console.log('d= ' + d);
    if (d < 0) {
        $('body').addClass('fixer');
    } else {
        $('body').removeClass('fixer');
    }
}

function orderBtn() {
    $('.jsbtny').click(function(e) {
        e.preventDefault();
        $(this).addClass('active');
        $('.jsbtnn').removeClass('active');
        $('.jsorgwr').slideDown();
    });
    $('.jsbtnn').click(function(ee) {
        ee.preventDefault();
        $(this).addClass('active');
        $('.jsbtny').removeClass('active');
        $('.jsorgwr').slideUp();
    });
}




$(document).ready(function() {

    menuBars();
    orderBtn();
    advSlider();
    menuTop();
    priceOnNav();
    upScroll();
    btnPartners();
    cartCalc();
    categoryMenu();
    brandOpen();
    filterOpen();
    slidersInit();
    inputFileReset();
    mapTabs();
    searchOpen();
    widthDotsCompany();
    searchOpener();
    headMobContact();
    widthMobMnu();
    openMobInform();

    $('select').niceSelect();

    $('select').niceSelect();
    $(".itsl a").fancybox();
    $(".phoneinp").inputmask("+7 (999) 999-99-99");
    $("input[type='tel']").inputmask("+7 (999) 999-99-99");
    $(".order-tablewr").mCustomScrollbar({
        axis: "y"
    });
    $(".selval").mCustomScrollbar({
        axis: "y"
    });

    // $('.modthanks').modal('show');

    $(window).resize(function() {
        widthMobMnu();
        footerFixed();
    });
    footerFixed();

});

$(document).ready(function() {
    $('#hero-slider').on('init', function(e, slick) {
        var $firstAnimatingElements = $('div.hero-slide:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
    });
    $('#hero-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('div.hero-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
    });
    $('#hero-slider').slick({
        autoplay: false,
        autoplaySpeed: 6000,
        fade: true,
        cssEase: 'linear',
        arrows: true
    });

    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }
});