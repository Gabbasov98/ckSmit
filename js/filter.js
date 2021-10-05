var filter = new function () {
    this.init = function () {
        this.initSlider();

        $('button.jscheckers').on('click', function(e) {
            e.preventDefault();
        });
    };

    this.initSlider = function () {
        var $slider = $("#slider-range"),
            $from = $('.catformcostl'),
            $to = $('.catformcostr');

        $slider.slider({
            range: true,
            min: parseInt($slider.data('min')),
            max: parseInt($slider.data('max')),
            step: 1,
            values: [parseInt($from.val()), parseInt($to.val())],
            slide: function (event, ui) {
                $from.val($slider.slider("values", 0));
                $to.val($slider.slider("values", 1));
            }
        });
    };
}();

$(document).ready(function () {
    filter.init();
});