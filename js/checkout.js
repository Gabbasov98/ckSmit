$(document).ready(function() {
    $('#checkout_form').on('submit', function(e) {
        if(!validateForm($(this))) {
            e.preventDefault();
        } else {
            if(!$('.jsbtny').hasClass('active')) {
                $('.jsorgwr').find('input').each(function(){
                    $(this).val(null);
                });
            }
        }
    });
});