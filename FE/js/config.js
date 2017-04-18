(function(exports) {
  var config = [{
    type: 'head',
    desc: '头部',
    attr: [{
      type: 'width',
      desc: '宽度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, {
      type: 'height',
      desc: '高度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, ]
  }, {
    type: 'hair',
    desc: '头发',
    attr: [{
      type: 'width',
      desc: '宽度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, {
      type: 'height',
      desc: '高度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, {
      type: 'left',
      desc: '左偏移',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'top',
      desc: '上偏移',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, ]
  }, {
    type: 'face',
    desc: '脸部',
    attr: [{
      type: 'width',
      desc: '宽度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, {
      type: 'height',
      desc: '高度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, ]
  }, {
    type: 'eye',
    desc: '眼睛',
    attr: [{
      type: 'width',
      desc: '宽度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, {
      type: 'height',
      desc: '高度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, {
      type: 'left',
      desc: '左偏移',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'top',
      desc: '上偏移',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, ]
  }, {
    type: 'mouth',
    desc: '嘴巴',
    attr: [{
      type: 'width',
      desc: '宽度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, {
      type: 'height',
      desc: '高度',
      value_type: 'percentage',
      defaullt: '60%',
      min: '40%',
      max: '100%',
    }, {
      type: 'left',
      desc: '左偏移',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'top',
      desc: '上偏移',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'border-width',
      desc: '嘴唇',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'border-color',
      desc: '嘴唇颜色',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'border-radius-left-top',
      desc: '左上角',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'border-radius-left-bottom',
      desc: '左上角',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'border-radius-right-top',
      desc: '左上角',
      value_type: 'percentage',
      defaullt: '0%',
      min: '0%',
      max: '100%',
    }, {
      type: 'border-radius-right-bottom',
      desc: '右下角',
      value_type: 'percentage',
      defaullt: '0%',
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

  exports.avatar_type_config = avatar_type_config;
})(window);