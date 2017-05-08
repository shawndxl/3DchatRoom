(function() {
	if (!window.localStorage) return alert('Not found localStorage!');
	if(!localStorage.getItem('avatarInfo')) return window.location = 'index.html';

	var avatarInfo = {
	  id: 'sfa',
	  name: 'dxx',
	  sex: 1,
	  avatar: {
	  }
	};

	var avatarInfo = localStorage.getItem('avatarInfo');

	// 人物的移动镜头（视角）也会移动
	function initAvatar() {}
	function initWs() {}

	var leftInit = 0;
	var topInit = 0;

	var initTimeStramp = 0;

	//  $('.person').removeClass('walking')
	// $('.person').addClass('walking')
	var personMove;
	$('.bottom').on('click', 'span', function(e) {
		if (Date.now() - initTimeStramp < 400) return;
		initTimeStramp = Date.now();
		clearTimeout(personMove)
		var person = document.querySelector('.stand_wrap');
		var robot = document.querySelector('#robot')
		robot.className = 'walking'

		// todo e.pageX 是相对与screen的，
		// var x = evt.pageX - $('#element').offset().left;
		//var y = evt.pageY - $('#element').offset().top;
		var x1 = person.offsetLeft;
		var y1 = person.offsetTop;
		var x2 = e.currentTarget.offsetLeft;
		var y2 = e.currentTarget.offsetTop;
		console.log('click: ', x2, y2);
		console.log('center: ', x1, y1);
		//return;

		var center = [x1, y1];
		var space = 50;
		var distance = Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2))
		var angle = Math.acos((x2 - x1) / distance) * 180 / Math.PI;
		if (y2 < y1) angle = -angle
		console.log('angle: ', angle)

		var a = getCirclePoint(center, space, angle);
		console.log('end： ', a)

		// 动态计算动画时间，防止每走一步都停止
		var time = (distance / 20) * .1; // 20是span的宽度
		person.style.transitionDuration = time + 's';
		person.style.left = x2 + 'px';
		person.style.top = y2 + 'px';
		personMove = setTimeout(function() {
			robot.className = ''
		}, time * 1000)
	})

	$('body').on('click', '.person', function() {
		alert(1)
	})

	function getCirclePoint(center, space, angle) { // 有圆心、半径、角度求圆上的某一点
		var radian = 2 * Math.PI / 360 * angle; // 弧度
		var radian = angle / 180 * Math.PI;

		var x1 = Number(center[0]) + Math.cos(radian) * space;
		var y1 = Number(center[1]) + Math.sin(radian) * space;

		return [x1.toFixed(1), y1.toFixed(1)];
	}


	var bottom = document.querySelector('.bottom');
	for (var i = 0; i < 200; i++) {
		var span = document.createElement('span');
		// span.setAttribute('class', 'liti')
		bottom.appendChild(span);
		// span.addEventListener('click', function() {
		//   alert(1)
		// })
	}
	var init = 0;
	//loop();
	function loop() {
		bottom.style.transform = 'rotateX(90deg) translateY(' + init + 'px)'

		if (init > 1000) {
			init = 0;
		};
		init++;
		setTimeout(loop, 10)
	}
})()


/*

 */