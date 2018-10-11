let $ = require('jquery');
let utils = require('../app.utils');

module.exports = {

    locators: {
        $trigger: '.js-progress',
        $component: '.o-progress-bar',
        $currentScroll: '.o-progress-bar__current',
        isActive: 'is-active'
    },


    activeProgressBar: function () {
        $(this.locators.$component).addClass(this.locators.isActive);
    },

    shouldInitProgressBar: function () {
        return $('body')[0].getBoundingClientRect().height > utils.getOuterHeight($(window));
    },

    updateProgressBar: function (isDevice) {


        let windowTop = utils.viewPortTop(),
            documentHeight = $('body').innerHeight(),
            windowHeight = utils.getOuterHeight($(window)),
            totalScroll = Math.round((windowTop / (documentHeight - windowHeight)) * 100);

        if (isDevice) {
            $(this.locators.$currentScroll).css("height", totalScroll + "%");
        } else {
            $(this.locators.$currentScroll).css("width", totalScroll + "%");
        }
    },

    bindEvents: function () {

        let that = this;
        let isDevice = utils.checkIfIsDevice();

        document.addEventListener("DOMContentLoaded", function() {
            if (that.shouldInitProgressBar()) {
                that.activeProgressBar();
                that.updateProgressBar(isDevice);
            }
        });
        document.addEventListener('scroll',function () {

            that.updateProgressBar(isDevice);
        },utils.supportPassiveEvents() ? {passive: true} : false);

    },
    init: function () {
        if (this.locators.$trigger.length > 0) {
            this.bindEvents();
        }
    }
};