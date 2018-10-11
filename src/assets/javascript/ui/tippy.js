let $ = require('jquery');
let utils = require('../app.utils');
let tippy = require('tippy.js')

module.exports = {

    locators: {
        $trigger: ".js-tippy"
    },





    bindEvents: function () {

        tippy.browser.onUserInputChange = type => {
            console.log('The user is now using', type, 'as an input method')
        }


        tippy(this.locators.$trigger,{
            delay: 100,
            arrow: true,
            arrowType: 'round',
            size: 'large',
            duration: 500,
            animation: 'scale',
            interactive: true
        });


    },

    init: function () {
        let that =  this;
        document.addEventListener("DOMContentLoaded", function() {

            if(document.getElementsByClassName(that.locators.$trigger)) {
                that.bindEvents();
            }


        });
    }

};