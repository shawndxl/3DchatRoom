(function(exports) {
  var avatarHtml = getElem('#avatarHtml').innerHTML;

  // TODO:函数式编程与面向对象编程的优劣，取舍是否要在内存中保留所有avatar对象，能否即逻辑清晰，又实现即用即消
  /**
   * [Avatar description: 创建人物对象，包含setter行走属性、改变形象属性，getter位置属性,在页面中插入人物的元素，并以用户id生成DOM ID]
   * @param {[object]} config  [配置项]
   * @param {[string]} user_id [用户ID，用来生成对应dom元素的id等唯一信息]
   */
  function Avatar(avatarInfo, parentSelector) {
    var _this = this;
    this.config = avatarInfo.avatar;
    this.user_id = avatarInfo.user_id;

    // var $self = document.querySelector('#avatar_' + user_id);

    /**
     * [创建人物]
     * @return {[type]} [description]
     */
    var _crate = function() {
      if (getElem('#avatar_' + _this.user_id)) return console.log('already has #avatar_' + _this.user_id);
      var html = avatarHtml;
      var div = document.createElement('div');
      _this.$self = div;
      
      div.setAttribute('id', 'avatar_' + _this.user_id);
      div.className = 'stand_wrap';// 脚下的位置占用框
      div.innerHTML = jhtmls.render(html, avatarInfo);
      // floor: 101,
      var $floor = getElem('span[index="'+avatarInfo.floor+'"]');

      if ($floor) {
        div.style.left = $floor.offsetLeft + 'px';
        div.style.top = $floor.offsetTop + 'px';
      }

      getElem(parentSelector).appendChild(div); // 给了位置后再append防止触发默认样式与现有样式的transition

      _this.config.forEach(function(item) {
        item.attr.forEach(function(subItem) {
          _this.set(item.type, subItem.type, subItem.default+subItem.unit); // 初始化配置项中的所有属性
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
      // console.log($result);
      // return;
      $result.forEach(function(item) {
        item.style[attribute] = value;
      })

    };

    this.walkTo = function() {};

    /**
     * [得到自身配置中某个部位的某个属性的值]
     */
    this.getAttr = function(part, attr) {
      var obj = _this.config.filter(function(item) {
        return item.type == part
      })[0].attr.filter(function(item) {
        return item.type == attr;
      })[0];
      return obj.default + obj.unit; // 连同单位一起返回了
    };

    /**
     * [表情函数]
     * @type {Object}
     */
    this.emoji = {
      U1F30D: function() { // 解析常用的emoji对应一套实用在所有avatar上的动画，作为表情，比如嘴巴的微笑可以通过宽度变宽+边角弧度实现
        console.log('emoji inside');
        
        // console.log('old', old);
        find(_this.$self, '.mouth').forEach(function(item) {
          item.style.width = '10%';
        });
        find(_this.$self, '.eye').forEach(function(item) {
          item.style.width = '10%';
          item.style.height = '10%';
        });
        // 待加表情锁，设置最小响应间隔
        setTimeout(function() {
          find(_this.$self, '.mouth').forEach(function(item) {
            item.style.width = _this.getAttr('mouth', 'width');
          });
          find(_this.$self, '.eye').forEach(function(item) {
            item.style.width = _this.getAttr('eye', 'width');
            item.style.height = _this.getAttr('eye', 'height');
          });
        }, 1000);
      },
    }

    this.init = function() {
      _crate();
    };

    this.init();
  }

  exports.Avatar = Avatar;
})(window);