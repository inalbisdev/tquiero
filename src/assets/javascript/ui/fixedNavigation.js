let $ = require('jquery');
let utils = require('../app.utils');
let _ = require('lodash');


module.exports = {

    locators: {
        $trigger: '.js-fixed-nav',
        $nav: '.o-navigation',
        $navItem: 'o-navigation__item',
        $sections: "[data-navigation]"
    },

    calculatePositions: function (that) {
        let currentPosition = utils.viewPortTop();
        _.forEach($(this.locators.$sections), function (section) {
            let topPosition = utils.getOffsetTop($(section)) - that.getNavigationHeight(),
                bottomPosition = topPosition + $(section).outerHeight();

            if (currentPosition >= topPosition && currentPosition <= bottomPosition) {
                $(that.locators.$nav).find('a').removeClass('active');
                $(that.locators.$sections).removeClass('active');
                $(section).addClass('active');
                $(that.locators.$nav).find('a[href="#' + $(section).attr('id') + '"]').addClass('active');
            }
        });
    },

    getNavigationHeight: function () {
        return $(this.locators.$nav).outerHeight();
    },

    bindEvents: function () {

        let that = this;


        window.addEventListener('scroll',function (e) {
            e.stopImmediatePropagation();
            that.calculatePositions(that);
        },utils.supportPassiveEvents() ? {passive: true} : false);


    },

    init: function () {
        this.bindEvents();
    }

};
