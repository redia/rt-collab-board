onmessage = function(event) {
    event.socket.emit('draw:progress', event.room, event.uid, JSON.stringify(event.path_to_send));
    event.path_to_send.path = new Array();
}