(function(exports) {
  const wsUrl = 'http://localhost:8081';

  function initSocket(baseInfo) {
    var _socket = io(wsUrl, {
      reconnectionDelay: 1000,
      reconnectionAttempts: 3
    });

    _socket.on('connect', function() {
      // console.log(socket.id);
      _socket.emit('newGuy', baseInfo);
    });

    _socket.on('disconnect', function() {
      console.log('disconnect')
    });

    _socket.on('error', function(err) {
      console.error('Error: ', err)
    });

    // 待确认如何优化包装
    _socket.sendMsg = function(event, data) {
      // if (!socket) return console.error('no socket');
      _socket.emit(event, data);
    };

    return _socket;
  }

  exports.initSocket = initSocket;
})(window);