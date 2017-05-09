(function() {
  
  /* 主逻辑 */
  var avatarInfo = window.localStorage && localStorage.getItem('avatarInfo') && JSON.parse(localStorage.getItem('avatarInfo'));
  if (!avatarInfo) return alert('not found config file #1');

  var config = avatarInfo.avatar;


  const room_id = 0; // 常量 main_land
  const wsUrl = 'http://localhost:8081';

  console.log(avatarInfo)

  var socket = initSocket({
    room_id: room_id,
    user_id: avatarInfo.user_id,
    nickname: avatarInfo.name,
    sex: 1
  });
  
  initEvent();

  /* 初始化房间中的所有人 */
  socket.on('allGuy', function(allData) {
    console.log('1', allData);
    if (!allData) return;
    allData.forEach(function(data) {
      initOneUser(data);
    })
  });

  /* 有新的人加入房间 */
  socket.on('newGuy', function(data) {
    console.log('newGuy', data)
    initOneUser(data);
  });

  /* 有人离开房间 */
  socket.on('leaveGuy', function(data) {
    console.log('leaveGuy', data);
    try {
      var userNode = getElem('#user_' + data.user_id);
      userNode.parentNode.removeChild(userNode);
    } catch(err) {console.error(err);}
  });

  /* 接收到消息 */
  socket.on('msg', function(data) {
    var p = document.createElement('p');
    p.innerText = data.nickname + ': ' + data.text;
    getElem('#output').appendChild(p);
  });

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
    var _socket = io(wsUrl, {
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
        /* 发送消息 */
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