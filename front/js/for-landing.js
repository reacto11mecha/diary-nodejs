$(window).on('load', () => {
    $('.jumbotron .container').addClass('muncul');
});

$(document).ready(function () {
    $('#perkenalan #filled-content').html(string_fill);
    $('#auth').css('height', '100%');

    $('#auth a').each(function (index, el) {
        $(el).attr('href', `${location.origin}${$(el).attr('href')}`)
    })
});