(function() {
  var getElem = function(selector) {
    return document.querySelector(selector)
  }

  var baseInfo = {
    room_id: 1,
    user_id: Math.ceil(Math.random() * 100),
    nickname: Math.round(Date.now() / Math.ceil(Math.random() * 10 )).toString(36),
    sex: 1
  }

  var socket = initSocket(baseInfo);
  initEvent();

  socket.on('newGuy', function(data) {
    console.log('newGuy', data)
    initOneUser(data);
  });

  socket.on('allGuy', function(allData) {
    console.log('1', allData);
    if (!allData) return;
    allData.forEach(function(data) {
      initOneUser(data);
    })
  });

  socket.on('msg', function(data) {
    var p = document.createElement('p');
    p.innerText = data.nickname + ': ' + data.text;
    getElem('#output').appendChild(p);
  });

  socket.on('leaveGuy', function(data) {
    console.log('leaveGuy', data);
    try {
      var userNode = getElem('#user_' + data.user_id);
      userNode.parentNode.removeChild(userNode);
    } catch(err) {console.error(err);}
  })

  function initOneUser(data) {
    var p = document.createElement('p');
    p.setAttribute('id', 'user_' + data.user_id);
    p.innerText = ['女', '男'][data.sex] + ': ' + data.nickname;
    getElem('#room_info').appendChild(p);
  }

  function sendMsg(event, data) {
    if (!socket) return console.error('no socket');
    socket.emit(event, data);
  }

  function initSocket(baseInfo) {
    var _socket = io('http://localhost:8081', {
      reconnectionDelay: 1000,
      reconnectionAttempts: 3
    });

    _socket.on('connect', function() {
      // console.log(socket.id);
      socket.emit('newGuy', baseInfo);
    });

    _socket.on('disconnect', function() {
      console.log('disconnect')
    });

    _socket.on('error', function(err) {
      console.error('Error: ', err)
    });

    return _socket;
  }

  function initEvent() {
    getElem('body').addEventListener('click', function(e) {
      var cmd = e.target.getAttribute('cmd');
      console.log(cmd);
      if (!cmd) return;

      switch (cmd) {
        case 'msg':
          var room_id = getElem('#room_id').value;
          var nickname = getElem('#nickname').value;
          var user_id = getElem('#user_id').value;
          var text = getElem('textarea').value;
          var obj = {room_id,nickname,user_id,text};
          sendMsg(cmd, obj);
          break;
      }
    })
  }

})();