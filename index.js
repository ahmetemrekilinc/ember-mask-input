'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon : function(){
    return true;
  },
  hintingEnabled: function() {
    return false;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    //jquery-mask
    app.import('node_modules/jquery-mask-plugin/dist/jquery.mask.min.js');

  }
};
