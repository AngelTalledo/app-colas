
var socket = io();

var label = $('#lblNuevoTicket');
socket.on('connect', function () {
    console.log('Conectado')
});

socket.on('disconnect', function () {
    console.log('desconectado')

});

socket.on('currentTicket', function (resp) {
    label.text('Ticket ' +resp.actual );

});


$('button').on('click', function () {
    socket.emit('nextTicket', null, function (nT) {
        label.text(nT)
    });
});