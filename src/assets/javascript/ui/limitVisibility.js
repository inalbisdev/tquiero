let $ = require('jquery');
let utils = require('../app.utils');
let _ = require('lodash');


module.exports = {

    locators : {
        $trigger: '.js-limit',
        defaultHiddenClass: 'u-hidden'
    },

    isAnyElementVisible: function ($el) {
        let isElementVisible = false;

        _.forEach($el,function ($el) {
            if (utils.isElementOnViewPort($($el))) {
                isElementVisible = true;
            }
        });


        return isElementVisible;
    },

    toggleElementTarget: function ($el,isVisible) {
        $el.toggleClass(this.hasCustomClass($el),isVisible);
    },

    hasCustomClass : function (trigger) {
        return $(trigger).data('custom-class') ? $(trigger).data('custom-class') : this.locators.defaultHiddenClass;
    },

    bindEvents: function () {

        let that = this;

        window.addEventListener('scroll', function(e) {
            e.stopImmediatePropagation();
            _.forEach($(that.locators.$trigger), function (trigger) {
                let id = $(trigger).attr('id'),
                    currentStatus = $(trigger).hasClass(that.hasCustomClass(trigger)),
                    shouldBeHidden = that.isAnyElementVisible($('[data-limit="#' + id + '"]'));
                if (shouldBeHidden !== currentStatus) {
                    that.toggleElementTarget($(trigger), shouldBeHidden);
                }
            });
        },utils.supportPassiveEvents() ? {passive: true} : false);



    },

    init: function () {
        if(this.locators.$trigger.length > 0){
            this.bindEvents();
        }
    }
};
