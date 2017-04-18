;
(function() {

  var user_id = 101;
  var rangeHtml = getElem('#rangeHtml').innerHTML;
  var rangeTypesHtml = getElem('#rangeTypesHtml').innerHTML;

  var find = function(elem, name) {
    console.log(elem);
    if (elem.childNodes && elem.childNodes.length > 0) {
      return Array.from(elem.childNodes).filter(function(item) {
        if (item.nodeType == 1) {
          if (item.getAttribute('class') == name) {
            return item;
          } else {
            return find(item, name)
          }
        } 
      })
    }
  };

  var avatar0 = initAvatar(avatar_type_config, user_id);

  // avatar0.set('hair', 'backgroundColor', 'pink');

  initEvent();  

  function initAvatar(config, user_id) {
    if (!config) return console.error('none config file #2');
    /* 初始化可以调节的项 */
    getElem('#rangeTypesHtml').parentNode.innerHTML = jhtmls.render(rangeTypesHtml, config);

    /* 初始化Avatar */
    return new Avatar(config, user_id);
  } 

  function Avatar(config, user_id) {
    var $this = this;
    var $self = document.querySelector('#avatar_' + user_id);

    this.set = function(part, attribute, value) {
      console.log(part, attribute, value)
      var $result = find($self, part);
      if ($result) {
        $result[0].style[attribute] = value + '%'; // TO DO:根据不同的attribute来改变不同的值，即px或者%等，待修改该参数为直接可以的单位，而非字符串percentage等
      } else {
        console.log('none a child named ' + part);
      }
    };
  }

  function getObjFromConfig(key) {
    if (!avatar_type_config) return console.error('none config file #1');
    switch (key) {
      case 'head':
        return avatar_type_config[key];
        break;
      case 'hair':
      case 'face':
        return avatar_type_config['head'][key];
        break;
      case 'eye':
      case 'mouth':
        return avatar_type_config['head']['face'][key];
        break;
    };
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
          // var obj = getObjFromConfig(type);
          var obj = avatar_type_config.filter(function(item) {
            return item.type == type;
          })[0].attr;
          getElem('.range_detail').innerHTML = jhtmls.render(rangeHtml, obj);
          /*
          var data = [];
          Object.keys(obj).forEach(function(item) {
            if (typeof obj[item] == 'object') return;
            data.push({
              key: item,
              value: obj[item],
            })
          })*/
          break;
          /* 调整进度条 input[type='range'] */
        case 'range_bar':
          var value = e.target.value;
          Array.from(e.target.parentNode.childNodes).filter(function(item) {
            if (item.nodeType == 1 && item.tagName == 'SPAN') {
              item.innerText = value;
              // getElem('.hair').style.backgroundColor = '#123';
              var parentType = getElem('.active[cmd="range_sl"]').getAttribute('r_type');
              avatar0.set(parentType, $this.getAttribute('r_type'), value); // 待优化，减少渲染次数，方案，手动setTimeout，clearTimeout，或者试试requestAnimationFrame
            }
          });
          break;
      }
    }

  }

})();