const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Conectado');



    client.on('nextTicket', function (data, callback) {
        let next = ticketControl.nextTicket();

        console.log(next);
        callback(next);
    });


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });



    // Emitir
    client.emit('currentTicket', {
        'actual': ticketControl.getLastTicket(),
        'ultimos4': ticketControl.getlast4()
    });

    // Escuchar el cliente
    client.on('attendTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: ' El escritorio es obligatirio'
            });
        }

        let atenderTicket = ticketControl.attendTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar y notificar los ultiumos 4
        client.broadcast.emit('last4', { ultimos4: ticketControl.getlast4() });

    });


});