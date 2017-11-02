/* eslint-env node */
'use strict';

var path = require('path'),
mergeTrees = require('broccoli-merge-trees'),
Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-mask-input',

  isDevelopingAddon : function(){
    return true;
  },
  hintingEnabled: function() {
    return false;
  },

  treeForVendor(tree){
    return mergeTrees([], { overwrite: true });
  },

  included(app) {
    this.bowerDirectory = app.bowerDirectory;
    this._super.included.apply(this, arguments);

    //jquery-mask
    app.import('node_modules/jquery-mask-plugin/dist/jquery.mask.min.js');

  },
  config(environment){
    let ENV = {};
    return ENV;
  }
};
