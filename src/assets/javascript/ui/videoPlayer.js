let $ = require('jquery');
let utils = require('../app.utils');

/*
* Casos:
*
*  - Video en linea que se reproduce o bien solo o cuando hace scroll
*  - Video que se abre en una capa ejecutado por un trigger
*  - Video al 100% del Viewport
* */


module.exports = {

    locators : {
        $trigger : $('.trigger')
    },

    soundControls: function () {

    },

    resetVideo : function () {

    },

    stopVideo: function () {

    },

    playVideo: function () {

    },


    bindEvents: function () {
      let that = this;

    },

    init: function () {
      this.bindEvents();
    }

};