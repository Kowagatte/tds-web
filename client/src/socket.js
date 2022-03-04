var sProvider = (function() {
    var socket = new WebSocket('ws://127.0.0.1:8888');

    return {
        getSocket: function() { return socket;}
    }
})();

exports.sProvider = sProvider;
