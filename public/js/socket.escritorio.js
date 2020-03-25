
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var lbl = $('h4 small');
$('h1').text(' Escritorio : ' + escritorio);

$('button').on('click', function () {
    socket.emit('attendTicket', { escritorio: escritorio }, function (resp) {
        if (resp.err) {
            lbl.text( resp.mensaje);

            alert(resp.mensaje);
            return;
        }
        lbl.text('Ticket #' + resp.numero);

    });

});