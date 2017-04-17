(function(exports) {

	exports.getElem = function(selector) {
		return document.querySelector(selector);
	};

	exports.getElemAll = function(selector) {
		return document.querySelectorAll(selector)
	}

})(window);