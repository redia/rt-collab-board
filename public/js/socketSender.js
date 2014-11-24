onmessage = function(event) {
    if(event.type==="drag"){
        event.socket.emit('draw:progress', event.room, event.uid, JSON.stringify(event.path_to_send));
        event.path_to_send.path = new Array();
    }
    else if(event.type==="drag"){
        event.socket.emit('draw:progress', event.room, event.uid, JSON.stringify(event.path_to_send));
        event.socket.emit('draw:end', event.room, event.uid, JSON.stringify(event.path_to_send));
    }
}