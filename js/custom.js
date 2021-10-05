$(document).ready(function() {
    $('select[data-action=redirect]').on('change', function() {
        window.location.href = $(this).find('option:selected').data('link');
    });

    $('body').on('click', 'button[data-link]', function(e) {
        e.preventDefault();

        window.location.href = $(this).data('link');
    });
});