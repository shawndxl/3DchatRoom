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

})(window);