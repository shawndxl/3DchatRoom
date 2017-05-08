(function(exports) {
  /**
   * [配置文件：1 对眼睛应该有特殊处理，有颜色的需求，有不同单位的需求]
   * @type {Array}
   */
  var config = [{
    type: 'head',
    desc: '头部',
    attr: [{
      type: 'width',
      desc: '宽度',
      unit: '%',
      default: '60',
      min: '40',
      max: '90',
    }, {
      type: 'height',
      desc: '高度',
      unit: '%',
      default: '60',
      min: '40',
      max: '90',
    }, ]
  }, {
    type: 'hair',
    desc: '头发',
    attr: [{
      type: 'borderTopLeftRadius',
      desc: '左上角',
      unit: '%',
      default: '20',
      min: '0',
      max: '100',
    }, {
      type: 'borderTopRightRadius',
      desc: '右上角',
      unit: '%',
      default: '20',
      min: '0',
      max: '100',
    }, {
      type: 'borderBottomRightRadius',
      desc: '右下角',
      unit: '%',
      default: '20',
      min: '0',
      max: '100',
    }, {
      type: 'borderBottomLeftRadius',
      desc: '左下角',
      unit: '%',
      default: '20',
      min: '0',
      max: '100',
    }, {
      type: 'backgroundColor',
      desc: '颜色',
      unit: '',
      default: '#ffffff', // 必须是6为16进制，3位或者red，rgb hsl等都无效
    }]
  }, {
    type: 'face',
    desc: '脸部',
    attr: [{
      type: 'width',
      desc: '宽度',
      unit: '%',
      default: '60',
      min: '40',
      max: '90',
    }, {
      type: 'height',
      desc: '高度',
      unit: '%',
      default: '60',
      min: '40',
      max: '90',
    }, {
      type: 'borderTopLeftRadius',
      desc: '左上角',
      unit: '%',
      default: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'borderTopRightRadius',
      desc: '右上角',
      unit: '%',
      default: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'borderBottomRightRadius',
      desc: '右下角',
      unit: '%',
      default: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'borderBottomLeftRadius',
      desc: '左下角',
      unit: '%',
      default: '0%',
      min: '0%',
      max: '100%',
    }, ]
  }, {
    type: 'eye',
    desc: '眼睛',
    attr: [{
      type: 'width', // 眼睛如果默认是圆的，采用大小的概念，改变宽度同时改变长度则需要在配置或解读时做特殊逻辑
      desc: '宽度',
      unit: '%',
      default: '6',
      min: '1',
      max: '10',
    }, {
      type: 'height',
      desc: '高度',
      unit: '%',
      default: '6',
      min: '1',
      max: '10',
    }, {
      type: 'margin', // 为了实现设置一个值，同时实现左右眼从两个方向改变值, 暂使用两者居中，通过margin实现
      desc: '眼距',
      unit: '%',
      default: '10',
      min: '0',
      max: '18',
    }, {
      type: 'backgroundColor',
      desc: '颜色',
      unit: '',
      default: '#222222',
    }]
  }, {
    type: 'mouth',
    desc: '嘴巴',
    attr: [{
      type: 'width',
      desc: '宽度',
      unit: '%',
      default: '20',
      min: '10',
      max: '36',
    }, {
      type: 'height',
      desc: '高度',
      unit: '%',
      default: '10',
      min: '8',
      max: '18',
    }, 
    // {
    //   type: 'left',
    //   desc: '左偏移',
    //   unit: '%',
    //   default: '0%',
    //   min: '0%',
    //   max: '100%',
    // }, {
    //   type: 'top',
    //   desc: '上偏移',
    //   unit: '%',
    //   default: '0',
    //   min: '0',
    //   max: '100',
    // }, 
    {
      type: 'borderWidth',
      desc: '嘴唇',
      unit: 'px',
      default: '2',
      min: '1',
      max: '5',
    }, 
    // {
    //   type: 'borderColor',
    //   desc: '嘴唇颜色',
    //   unit: '%',
    //   default: '0%',
    //   min: '0%',
    //   max: '100%',
    // }, 
    {
      type: 'borderTopLeftRadius',
      desc: '左上角',
      unit: '%',
      default: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'borderTopRightRadius',
      desc: '右上角',
      unit: '%',
      default: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'borderBottomRightRadius',
      desc: '右下角',
      unit: '%',
      default: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'borderBottomLeftRadius',
      desc: '左下角',
      unit: '%',
      default: '0%',
      min: '0%',
      max: '100%',
    }, ]
  },];

  /**
   * w - width / percentage / 0% - 100%
   * h - height / percentage  / percentage / 0% - 100%
   * l - left / percentage / 0% - 100%
   * t - top / percentage / 0% - 100%
   * c - color / vaild color value
   * bc - background-color / vaild color value
   * br - border-radius  / percentage / 0% - 100%
   * br1: border-radius-left-top  / percentage / 0% - 100%
   * br2: border-radius-right-top / percentage / 0% - 100%
   * br3: border-radius-right-bottom / percentage / 0% - 100%
   * br4: border-radius-left-bottom / percentage / 0% - 100%
   */

  var avatar_type_config = {
    head: {
      w: 1, // widht
      h: 2, // height

      hair: {
        w: 1,
        h: 2,
        c: 3, // color
        br1: 1, // border-radius-left-top
        br2: 1, // border-radius-right-top
        br3: 1, // border-radius-right-bottom
        br4: 1, // border-radius-left-bottom
      },

      face: {
        w: 1,
        h: 2,
        c: 1,
        br1: 1,
        br2: 1,
        br3: 1,
        br4: 1,

        eye: {
          w: 1,
          h: 2,
          c: 3,
          br: 1, // border-radius,
          l: 1, // left
          t: 1, // top
        },

        mouth: {
          w: 1,
          h: 2,
          c: 1, // lip color , // border-color
          bc: 1, // in mouth color, // background-color
          br1: 1,
          br2: 1,
          br3: 1,
          br4: 1,
        }
      },
    },
  };

  exports.avatar_type_config = config;
})(window);