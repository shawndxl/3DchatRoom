(function() {
	if (!window.localStorage) return alert('Not found localStorage!');
	var avatarInfo = localStorage.getItem('avatarInfo') && JSON.parse(localStorage.getItem('avatarInfo'));
	if (!avatarInfo) {
		alert('not found config file #1');
		window.location = 'index.html';
		return;
	}

	var config = avatarInfo.avatar;

	if (!house.houseId) {
		house.houseId = 1;
	}

	var personMove;
	initFloor();

	var room_id = 0;
	avatarInfo.room_id = room_id;

	//TODO: 整体传递进去，并新增位置参数
	var a = new Avatar(config, avatarInfo.id, '.bottom'); // Avatar(config, user_id, parentSelector)
	initEvent();
	

	var socket = initSocket(avatarInfo);
	// var socket = '';
	console.log(socket)
	if (socket) {
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
			} catch (err) {
				console.error(err);
			}
		});

		/* 接收到消息 */
		socket.on('msg', function(data) {
			var p = document.createElement('p');
			p.innerText = data.nickname + ': ' + data.text;
			getElem('#output').appendChild(p);
		});
	}

	function initOneUser(data) {
		console.log('back from server', data)
	}

	//  $('.person').removeClass('walking')
	// $('.person').addClass('walking')
	function initEvent() {
		getElem('body').addEventListener('click', function(e) {
			processEvent(e);
		});
		getElem('body').addEventListener('input', function(e) {
			processEvent(e);
		});

		// 无法获取到事件，待修复
		function processEvent(e) {
			$this = e.target;
			var cmd = $this.getAttribute('cmd');
			// console.log(cmd);
			alert(cmd)
			if (!cmd) return;

			switch (cmd) {
				/* 调整进度条 input[type='range'] */
				case 'floor_board':
					console.log(123);
					return;
					walk(getElem('.stand_wrap'), [e.currentTarget.offsetLeft, e.currentTarget.offsetTop])
					break;
				case 'submit':

					break;
			}
		}

	}

	var initTimeStramp = 0;
	// 自己走路为了体验直接走过去，不通过ws，别人的位置通过ws传递过来，这两者需要一个校正
	// 独立的行走函数还是放置到每个人的对象中去
	/**
	 * [谁 走到 哪儿]
	 * @param  {[DOM object]} $person [谁]
	 * @param  {[object]} e       [哪儿]
	 */
	function walk($person, point) {
		if (Date.now() - initTimeStramp < 400) return;
		initTimeStramp = Date.now();
		clearTimeout(personMove);
		var person = $person;
		var robot = find($person, '.robot')[0];
		robot.className = 'walking';

		var x1 = person.offsetLeft,
			y1 = person.offsetTop,
			x2 = point[0],
			y2 = point[1];
		console.log('center: ', x1, y1, 'click: ', x2, y2);

		var distance = Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
		/* 点击一下地面走该角度的固定距离，暂时没用到 */
		/*
		var center = [x1, y1];
		var space = 50;
		var angle = Math.acos((x2 - x1) / distance) * 180 / Math.PI;
		if (y2 < y1) angle = -angle;
		var radiusLength = getCirclePoint(center, space, angle); 
		*/

		// 移动位置，动态计算动画时间，防止每走一步都停止
		var time = (distance / 20) * .1; // 20是span的宽度
		person.style.transitionDuration = time + 's';
		person.style.left = x2 + 'px';
		person.style.top = y2 + 'px';
		personMove = setTimeout(function() {
			robot.className = ''
		}, time * 1000);
		// 移动视角
		getElem('body').style.transformOrigin = '';
	}

	function initFloor() {
		var bottom = getElem('.bottom');
		for (var i = 0; i < 200; i++) {
			var span = document.createElement('span')
			span.setAttribute('cmd', 'floor_board');
			bottom.appendChild(span);
		}
	}
})()