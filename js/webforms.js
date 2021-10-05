var webforms = new function() {
    this.init = function(selector) {
        $(selector).on('submit', function(e){
            e.preventDefault();

            var $form = $(this),
                formValid = true;

            $form.find('*[data-required]').each(function() {
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

            $($form.data('error')).hide();

            if(formValid) {
                $.ajax($form.attr('action'), {
                    data: $form.serialize(),
                    dataType: 'json',
                    method: 'POST'
                }).done(function(data){
                    if(!!data['hideForm'] && !!$form.data('success')) {
                        $form.closest('div.modal').modal('hide');
                        $($form.data('success')).modal('show');
                    }
                });
            } else {
                $($form.data('error')).show();
            }
        });
    };
};

$(document).ready(function(){
    webforms.init('form[data-ajax=true]');
});