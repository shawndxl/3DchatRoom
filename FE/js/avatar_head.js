(function() {
  /* 主逻辑 */
  var avatarConfig = (window.localStorage && localStorage.getItem('avatarInfo') && JSON.parse(localStorage.getItem('avatarInfo')).avatar) || window.avatar_type_config;
  if (!avatarConfig) return alert('缺少配置文件');

  var rangeHtml = getElem('#rangeHtml').innerHTML;
  var rangeTypesHtml = getElem('#rangeTypesHtml').innerHTML;
  var avatarHtml = getElem('#avatarHtml').innerHTML;

  var avatar0 = initAvatar(avatarConfig, '.avatar_container'); // 根据配置渲染并append到其容器

  initEvent();
  
  setTimeout(function() {
    console.log(avatar0.emoji.U1F30D(), 'ssfl')
    // avatar0.set('head', 'width', '62%');
  }, 2000)

  /* 主逻辑结束 */

  /**
   * [initAvatar: 根据配置文件初始化可调节的项]
   * @param  {[type]} config  [description]
   * @param  {[type]} user_id [这个用户的ID，如果对于新人来讲其实是没有ID的，]
   * @return {[object]}         [提供给新用户配置的初始化人物形象]
   */
  function initAvatar(config, parentSelector) {
    if (!config) return console.error('none config file #2');
    /* 初始化可以调节的项 */
    getElem('#rangeTypesHtml').parentNode.innerHTML = jhtmls.render(rangeTypesHtml, config);

    /* 初始化Avatar */
    return new Avatar(config, 0, parentSelector); // 该页面用0，其他页面用正式的ID
  } 

  // TODO:函数式编程与面向对象编程的优劣，取舍是否要在内存中保留所有avatar对象，能否即逻辑清晰，又实现即用即消
  /**
   * [Avatar description: 创建人物对象，包含setter行走属性、改变形象属性，getter位置属性,在页面中插入人物的元素，并以用户id生成DOM ID]
   * @param {[object]} config  [配置项]
   * @param {[string]} user_id [用户ID，用来生成对应dom元素的id等唯一信息]
   */
  function Avatar(config, user_id, parentSelector) {
    var _this = this;
    this.config = config;
    this.user_id = user_id;

    // var $self = document.querySelector('#avatar_' + user_id);

    /**
     * [创建人物]
     * @return {[type]} [description]
     */
    var _crate = function() {
      var html = avatarHtml;
      var div = document.createElement('div');
      _this.$self = div;
      getElem(parentSelector).appendChild(div);
      div.setAttribute('id', 'avatar_' + _this.user_id);
      div.innerHTML = jhtmls.render(html, {
        config: _this.config,
        user_id: _this.user_id,
      });
      _this.config.forEach(function(item) {
        item.attr.forEach(function(subItem) {
          _this.set(item.type, subItem.type, subItem.default); // 初始化配置项中的所有属性
        })
      });
    };

    

    /**
     * [设置形象-设置css属性]
     * @param {[string]} part      [人物中可以设置的项，例如 'face']
     * @param {[string]} attribute [css 属性 ，但需要包含在配置文件的属性字典中]
     * @param {[string]} value     [想要设置的css属性的值]
     */
    this.set = function(part, attribute, value) {
      console.log(part, attribute, value);
      var selector = '.' + part; // 目前简单的采用调节项的type作为名字，如果优化改动该位置以及对应的html渲染位置即可
      var $result = find(this.$self, selector);
      console.log($result);
      // return;
      $result.forEach(function(item) {
        item.style[attribute] = value;
      })
      
    };

    this.walkTo = function() {};

    this.emoji = {
      U1F30D: function() { // 解析常用的emoji对应一套实用在所有avatar上的动画，作为表情，比如嘴巴的微笑可以通过宽度变宽+边角弧度实现
        find(this.$self, '.mouth').forEach(function(item) {
          item.style.width = '10%';
        });
        find(this.$self, '.eye').forEach(function(item) {
          item.style.width = '10%';
          item.style.height = '10%';
        });
      },
    }

    this.init = function() {
      _crate();
    };

    this.init();
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

          var obj = avatarConfig.filter(function(item) {
            return item.type == type;
          })[0].attr;
          getElem('.range_detail').innerHTML = jhtmls.render(rangeHtml, obj);
         
          break;
          /* 调整进度条 input[type='range'] */
        case 'range_bar':
          var attr = $this.getAttribute('r_type');
          var value = e.target.value + e.target.getAttribute('data-unit');
          if (attr.match(/color/i)) { // 如果是颜色，则不用加单位
            value = e.target.value;            
          }
          // 改变avatar对应的样式
          var parentType = getElem('.active[cmd="range_sl"]').getAttribute('r_type');
          avatar0.set(parentType, attr, value); // TODO: 减少渲染次数，方案，手动setTimeout，clearTimeout，或者试试requestAnimationFrame
          // 找到 span 改变其值
          Array.from(e.target.parentNode.childNodes).some(function(item) { // TODO: 使用月影的方法替代Array.from
            if (item.nodeType == 1 && item.tagName == 'SPAN') {
              item.innerText = value;
              return true;
            }
          });
          // 同时改变配置对象的值，以便提交时可以直接把最后的配置项本身保存到
          avatarConfig.some(function(item) {
            if (item.type === parentType) {
              item.attr.some(function(subItem) {
                if (subItem.type === attr) {
                  subItem.default = value;
                  return true;
                }
              });
              return true;
            }
          });
          break;
        case 'submit':
          var sex = getElem('#checkbox').checked ? 0 : 1;
          var name = getElem('#nickname').value.trim();
          console.log(sex, ':', name);
          if (!name) return alert('input a nickname');
          var avatarInfo = {
            id: Math.random().toString(32).slice(2, 7), // 生成一个随机的五位字符串作为ID 
            name: name,
            sex: sex,
            avatar: avatarConfig
          }
          localStorage.setItem('avatarInfo', JSON.stringify(avatarInfo));
          window.location = 'house.html';
          break;
      }
    }

  }

  
})();