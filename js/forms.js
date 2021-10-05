function validateForm($form) {
    var formValid = true;

    $form.find('*[data-required]:visible').each(function() {
        var valid = true;

        switch($(this).attr('type')) {
            case 'checkbox':
                if(!$(this).is(':checked')) {
                    valid = false;
                }
                break;
            default:
                if(!$(this).val()) {
                    valid = false;
                }

                break;
        }

        if(valid) {
            $(this).removeClass('error');
        } else {
            $(this).addClass('error');
            formValid = false;
        }
    });

    if(formValid) {
        $($form.data('error')).hide();
    } else {
        $($form.data('error')).show();
    }

    return formValid;
};