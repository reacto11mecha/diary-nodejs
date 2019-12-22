$('body').addClass('bg-secondary');
$(document).ready(function () {
    $('form').attr('action', `${location.origin}${$('form').attr('action')}`)
});