;
(function() {
  var rangeHtml = getElem('#rangeHtml').innerHTML;

  initEvent();

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
          var obj = getObjFromConfig(type);
          var data = [];
          Object.keys(obj).forEach(function(item) {
            if (typeof obj[item] == 'object') return;
            data.push({
              key: item,
              value: obj[item],
            })
          })
          getElem('.range_detail').innerHTML = jhtmls.render(rangeHtml, data)
          break;
          /* 调整进度条 input[type='range'] */
        case 'range_bar':
          console.log('hello world ');
          var value = e.target.value;
          Array.from(e.target.parentNode.childNodes).filter(function(item) {
            if (item.nodeType == 1 && item.tagName == 'SPAN') {
              item.innerText = value;
              // getElem('.hair').style.backgroundColor = '#123';
            }
          });
          break;
      }
    }
  }

})();