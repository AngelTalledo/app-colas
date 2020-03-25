var socket = io();
var lisTick = [];
var lisEsc = [];

for (i = 1; i <= 4; i++) {
    var lblTick = "$('#lblTicket" + (i) + "')";
    var lblEsC = "$('#lblEscritorio" + (i) + "')";
    lisTick.push(lblTick)
    lisEsc.push(lblEsC)
}


socket.on('connect', function () {
    console.log('Conectado')
});

socket.on('disconnect', function () {
    console.log('desconectado')

});

socket.on('currentTicket', function (resp) {
    getHtmlTicket(resp.ultimos4);
});

socket.on('last4', function (resp) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    getHtmlTicket(resp.ultimos4);
});

function getHtmlTicket(ultimos4) {
    if (ultimos4.length === 0) {
        for (i = 0; i < 4; i++) {
             
            eval(lisTick[i]).text('Esperando ...');
            eval(lisEsc[i]).text('Esperando ...');
        }
    }
    for (let i = 0; i < ultimos4.length; i++) {
        eval(lisTick[i]).text('Ticket ' + ultimos4[i].numero);
        eval(lisEsc[i]).text('Escritorio ' + ultimos4[i].escritorio);
    }

}
