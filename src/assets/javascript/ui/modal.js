let $ = require('jquery');
let utils = require('../app.utils');

module.exports = {

    locators: {
        $trigger: ".js-modal",
        $closeModal: ".o-modal__close",
        open: 'is-open',
        overflow: "u-hidden",
        openedModal: "",
    },



    togglePageScroll : function(){
        $('body').toggleClass(this.locators.overflow);
    },


    closeModal: function(){
        $(this.locators.openedModal).removeClass(this.locators.open);
        this.togglePageScroll();
    },

    openModal: function($el){
        let modal = $el.data('modal');
        this.locators.openedModal = $(modal);
        $(modal).addClass(this.locators.open);
        this.togglePageScroll();
    },

    bindEvents: function () {

        var that = this;

        $(document).keyup(function(e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                that.closeModal();
            }
        });

        $(this.locators.$closeModal).on('click',function () {
            that.closeModal();
        });

        $(this.locators.$trigger).on('click',function (e) {
            e.preventDefault();
            that.openModal($(this));
        });

    },

    init: function () {
        if($(this.locators.$trigger.length > 0)){
            this.bindEvents();
        }
    }

};