'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    //jquery-mask
    app.import('node_modules/jquery-mask-plugin/dist/jquery.mask.min.js');

  }
};
