function gallerySlider1() {
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 7,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            320: {
                slidesPerView: "auto",
                spaceBetween: 5
            },
            768: {
                slidesPerView: "auto",
                spaceBetween: 7
            },
        }
    });
    var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 50,
        navigation: {
            nextEl: ".catalog-gallery .swiper-button-next",
            prevEl: ".catalog-gallery .swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });
}
$(document).ready(function() {
    gallerySlider1()
    $(".cabinet__menu-top").click(function() {
        $(this).toggleClass("cabinet__menu-top--active")
        $(".cabinet__menu-items").slideToggle()
    })

    $(".password-toggle").click(function() {
        if ($(this).hasClass("password-toggle--active")) {
            $(this).siblings("input").attr("type", "password")
        } else {
            $(this).siblings("input").attr("type", "text")
        }
        $(this).toggleClass("password-toggle--active")


    })


    $('.custom-scroll-x').mCustomScrollbar({
        axis: 'x',
    });

    $(".faq__item-show").click(function() {
        $(this).toggleClass("faq__item-show--active")
    })

    $(".faq__subitem-show").click(function() {
        $(this).toggleClass("faq__subitem-show--active")
    })
    $(".faq__subsubitem-show").click(function() {
        $(this).toggleClass("faq__subsubitem-show--active")
    })

    $('input[name=org]').change(function() {
        // console.log(true)
        let path = $(this).attr("data-target");
        console.log(path)
        if (path === "yes") {
            $(`.reg__org-content`).show()
        } else {
            $(`.reg__org-content`).hide()
        }
    })

    $(".cabinet-save__cancel").click(function() {
        $(".cabinet-save").slideUp()
        $(".cabinet__user").removeClass("cabinet__user--save")
    })

    $(".cart__address-show").click(function() {

        if ($(this).hasClass("cart__address-show--active")) {
            $(this).removeClass("cart__address-show--active")
        } else {
            $(this).addClass("cart__address-show--active")
        }
    })

    $(".cart__address-variants").click(function() {
        let variant = $(this).attr("data-select-variant")
        $(".cart__address-variants").removeClass("cart__address-variants--active")
        $(this).addClass("cart__address-variants--active")
        $(".cart__address-selected").removeClass("cart__address-selected--active")
        $(`.cart__address-selected[data-select-tab='${variant}']`).addClass("cart__address-selected--active")
        $(".cart__address-show").removeClass("cart__address-show--active")
    })

    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $(".cart__address"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.children(".cart__address-show").removeClass("cart__address-show--active")
        }
    });

    $("#file-3").change(function() {
        console.log($(this))
        let fileName = $(this).context.files[0].name
        console.log(fileName)
        $(this).prop('disabled', true);
        $(this).siblings("label").children("span").text(fileName)
    })
    $(".removefile").click(function() {
        $("#file-3").prop('disabled', false);
    })

    $(".modal").on('shown.bs.modal', function() {
        cartCalcModal();
    })

    orderBtn2()

    if ($(".datepicker")) {
        datapicker()
    }
})

function cartCalcModal() {
    $('.cartcalc .ccalc-minus').click(function() {
        var a = $(this).closest('.cartcalc').find('input').val();
        if (a > 1) {
            var b = +a - 1;
            $(this).closest('.cartcalc').find('input').val(b).trigger('change');
        } else {
            $(this).closest('.cartcalc').find('input').val(a).trigger('change');
        }
    });
    $('.cartcalc .ccalc-plus').click(function() {
        var a = $(this).closest('.cartcalc').find('input').val();
        var b = +a + 1;
        $(this).closest('.cartcalc').find('input').val(b).trigger('change');
    });
}


function cartCalc() {
    $('.cartcalc .ccalc-minus').click(function() {
        var a = $(this).closest('.cartcalc').find('input').val();
        if (a > 1) {
            var b = +a - 1;
            $(this).closest('.cartcalc').find('input').val(b).trigger('change');
        } else {
            $(this).closest('.cartcalc').find('input').val(a).trigger('change');
        }
    });
    $('.cartcalc .ccalc-plus').click(function() {
        var a = $(this).closest('.cartcalc').find('input').val();
        var b = +a + 1;
        $(this).closest('.cartcalc').find('input').val(b).trigger('change');
    });
}

function datapicker() {
    $('.datepicker').datepicker(jQuery.datepicker.regional["ru"]);
}

function orderBtn2() {
    $('.jsbtny2').click(function(e) {
        e.preventDefault();
        $(this).addClass('active');
        $('.jsbtnn2').removeClass('active');
    });
    $('.jsbtnn2').click(function(ee) {
        ee.preventDefault();
        $(this).addClass('active');
        $('.jsbtny2').removeClass('active');
    });
}