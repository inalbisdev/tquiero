let $ = require('jquery');

module.exports = {

    locators : {
        $loading : '.m-loading'
    },

    bindEvents: function () {
        let that = this;
        document.addEventListener("DOMContentLoaded", function() {
            $(that.locators.$loading).addClass('is-hidden');
        });
    },
    init: function () {
        this.bindEvents();
    }

};