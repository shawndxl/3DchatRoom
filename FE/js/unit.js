(function(exports) {
	exports.getElem = function(selector) {
		return document.querySelector(selector);
	};

	exports.getElemAll = function(selector) {
		return document.querySelectorAll(selector)
	};

	/**
	 * 找到节点的所有子元素节点并返回数组
	 */
	function getChild(elem) {
		if (!elem.childNodes || !elem.childNodes.length || !(elem.childNodes.length > 0)) return;
		return Array.from(elem.childNodes).filter(function(item) {
			return item.nodeType == 1;
		});
	}

	exports.getChild = getChild;

	/**
	 * 在元素及子元素中找到符合选择器的元素
	 * @param  {[DOM object]} elem [description]
	 * @param  {[css selector]} name [description]
	 * @return {[Array]}      [返回空数组或者符合条件的DOM元素的数组]
	 */
	function find(elem, selector) {
		var arr = [];

		// TODO: 先序遍历的递归算法 尾递归算法能否合并
		// 思路：把所有元素放进去再遍历
		var preOrder = function(node) {
			if (node) {
				// console.log(node);
				arr.push(node);
				var child = getChild(node);
				if (child) {
					for (var i = 0; i < child.length; i++) {
						preOrder(child[i]);
					}
				}
			}
		};

		preOrder(elem);

		return arr.filter(function(item) {
			return Array.from(document.querySelectorAll(selector)).includes(item);
		});
	}
	exports.find = find;


	function hasClass(elem, cls) {
	  cls = cls || '';
	  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
	  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
	}
	exports.hasClass = hasClass;
	 
	function addClass(elem, cls) {
	  if (!hasClass(elem, cls)) {
	    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
	  }
	}
	exports.addClass = addClass;

	function removeClass(elem, cls) {
	  if (hasClass(elem, cls)) {
	    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
	    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
	      newClass = newClass.replace(' ' + cls + ' ', ' ');
	    }
	    elem.className = newClass.replace(/^\s+|\s+$/g, '');
	  }
	}
	exports.removeClass = removeClass;


	/**
	 * [有圆心、半径、角度求圆上的某一点]
	 * @param  {[array]} center [数组[x, y]]
	 * @param  {[number]} space  [半径]
	 * @param  {[number]} angle  [角度]
	 * @return {[array]}        [数组[x, y]]
	 */
	function getCirclePoint(center, space, angle) {
		// var radian = 2 * Math.PI / 360 * angle; 
		var radian = angle / 180 * Math.PI;// 弧度

		var x1 = Number(center[0]) + Math.cos(radian) * space;
		var y1 = Number(center[1]) + Math.sin(radian) * space;

		return [x1.toFixed(1), y1.toFixed(1)];
	}
	exports.getCirclePoint = getCirclePoint;

})(window);