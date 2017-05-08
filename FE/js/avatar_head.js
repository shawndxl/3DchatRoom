;
(function() {

  var user_id = 101;
  var rangeHtml = getElem('#rangeHtml').innerHTML;
  var rangeTypesHtml = getElem('#rangeTypesHtml').innerHTML;

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

  /**
   * 找到节点的所有子元素节点并返回数组
   */
  function getChild(elem) {
    if (!elem.childNodes || !elem.childNodes.length || !(elem.childNodes.length > 0)) return;
    return Array.from(elem.childNodes).filter(function(item) {
      return item.nodeType == 1;
    });
  }

  var avatar0 = initAvatar(avatar_type_config, user_id);

  initEvent();

  // 选择界面，localstorage是否存储了配置来决定显示，按照默认配置或缓存配置来渲染初始人物，选择房间，进入，渲染房间里的所有人，开始聊天


  /**
   * [initAvatar: 根据配置文件初始化可调节的项]
   * @param  {[type]} config  [description]
   * @param  {[type]} user_id [这个用户的ID，如果对于新人来讲其实是没有ID的，]
   * @return {[object]}         [提供给新用户配置的初始化人物形象]
   */
  function initAvatar(config, user_id) {
    if (!config) return console.error('none config file #2');
    /* 初始化可以调节的项 */
    getElem('#rangeTypesHtml').parentNode.innerHTML = jhtmls.render(rangeTypesHtml, config);

    /* 初始化Avatar */
    return new Avatar(config, user_id);
  } 

  // TODO:函数式编程与面向对象编程的优劣，取舍是否要在内存中保留所有avatar对象，能否即逻辑清晰，又实现即用即消
  /**
   * [Avatar description: 创建人物对象，包含setter行走属性、改变形象属性，getter位置属性,在页面中插入人物的元素，并以用户id生成DOM ID]
   * @param {[object]} config  [配置项]
   * @param {[string]} user_id [用户ID，用来生成对应dom元素的id等唯一信息]
   */
  function Avatar(config, user_id) {
    var _this = this;
    this.config = config;
    this.user_id = user_id;

    var $self = document.querySelector('#avatar_' + user_id);

    /**
     * [创建人物]
     * @return {[type]} [description]
     */
    var _crate = function() {
      var html = document.querySelector('#saa').html;
      var div = document.createElement('div');
      div.setAttribute('id', _this.user_id);
      div.innerHTML = jhtmls.render(html, _this.config);
      getElem('.')
    };

    this.init = function() {
      _crate();
    };

    // this.init();

    /**
     * [设置形象-设置css属性]
     * @param {[string]} part      [人物中可以设置的项，例如 'face']
     * @param {[string]} attribute [css 属性 ，但需要包含在配置文件的属性字典中]
     * @param {[string]} value     [想要设置的css属性的值]
     */
    this.set = function(part, attribute, value) {
      console.log(part, attribute, value);
      var selector = '.' + part; // 目前简单的采用调节项的type作为名字，如果优化改动该位置以及对应的html渲染位置即可
      var $result = find($self, selector);
      console.log($result);
      // return;
      $result.forEach(function(item) {
        item.style[attribute] = value;
      })
      
    };

    this.walkTo = function() {};

    this.emoji = {
      U1F30D: function() { // 解析常用的emoji对应一套实用在所有avatar上的动画，作为表情，比如嘴巴的微笑可以通过宽度变宽+边角弧度实现
        find($self, '.mouth').forEach(function(item) {
          item.style.width = '10%';
        });
        find($self, '.eye').forEach(function(item) {
          item.style.width = '10%';
          item.style.height = '10%';
        });
      },
    }
  }

  function initEvent() {
    getElem('body').addEventListener('click', function(e) {
      processEvent(e);
    });
    getElem('body').addEventListener('input', function(e) {
      processEvent(e);
    });

    function processEvent(e) {
      $this = e.target;
      var cmd = $this.getAttribute('cmd');
      // console.log(cmd);
      if (!cmd) return;

      switch (cmd) {
        /* 选择调整的样式 */
        case 'range_sl':
          if ($this.getAttribute('class') == 'active') {
            getElem('.range_detail').innerHTML = '';
            $this.setAttribute('class', '');
            return;
          }
          $this.parentNode.childNodes.forEach(function(item) {
            if (item.nodeType == 1) {
              item.setAttribute('class', '')
            }
          });
          $this.setAttribute('class', 'active');

          var type = $this.getAttribute('r_type');

          var obj = avatar_type_config.filter(function(item) {
            return item.type == type;
          })[0].attr;
          getElem('.range_detail').innerHTML = jhtmls.render(rangeHtml, obj);
         
          break;
          /* 调整进度条 input[type='range'] */
        case 'range_bar':
          // 如果是颜色，则不用加单位
          var attr = $this.getAttribute('r_type');
          var value = e.target.value + e.target.getAttribute('data-unit');
          if (attr.match(/color/i)) {
            value = e.target.value;            
          }
          // 改变avatar对应的样式
          var parentType = getElem('.active[cmd="range_sl"]').getAttribute('r_type');
          avatar0.set(parentType, attr, value); // 待优化，减少渲染次数，方案，手动setTimeout，clearTimeout，或者试试requestAnimationFrame
          // 找到 span 改变其值
          Array.from(e.target.parentNode.childNodes).some(function(item) {
            if (item.nodeType == 1 && item.tagName == 'SPAN') {
              item.innerText = value;
              return true;
            }
          });
          break;
      }
    }

  }

  setTimeout(function() {
    console.log(avatar0.emoji.U1F30D())
  }, 2000)
})();