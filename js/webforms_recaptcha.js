let webforms = new function () {
    this.init = function (selector) {
        $(selector).on('submit', function (e) {
            e.preventDefault();

            var $form = $(this);

            if (webforms.validate($form)) {
                if (typeof grecaptcha === 'undefined') {
                    webforms.sendAjax($form);
                } else {
                    grecaptcha.execute();
                }
            }
        });
    };

    this.validate = function ($form) {
        let formValid = true;

        $form.find('*[data-required]').each(function () {
            var valid = true;

            switch ($(this).attr('type')) {
                case 'checkbox':
                    if (!$(this).is(':checked')) {
                        valid = false;
                    }
                    break;
                default:
                    if (!$(this).val()) {
                        valid = false;
                    }
                    break;
            }

            if (valid) {
                $(this).removeClass('error');
            } else {
                $(this).addClass('error');
                formValid = false;
            }
        });

        if (formValid) {
            $($form.data('error')).hide();
        } else {
            $($form.data('error')).show();
        }

        return formValid;
    };

    this.sendAjax = function ($form) {
        $.ajax({
            url: $form.attr('action'),
            data: $form.serialize(),
            dataType: 'json',
            method: 'POST'
        }).done(function (data) {
            if (!!data['hideForm'] && !!$form.data('success')) {
                $form.closest('div.modal').modal('hide');
                $($form.data('success')).modal('show');
                $form.find('select:visible, input:visible, textarea:visible').val('');
                if(typeof grecaptcha !== 'undefined') {
                    grecaptcha.reset();
                }
            }
        });
    }
};

var webformsValidateRecaptchaCallback = function () {
    webforms.sendAjax($('#form_callback'));
};

$(document).ready(function () {
    webforms.init('form[data-ajax=true]');
});