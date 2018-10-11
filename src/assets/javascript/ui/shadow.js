let toggle =  require('./toggle');

module.exports = {


    locators: {
        $shadow: '.a-shadow',
    },


    createShadow: function(){
        let shadow = $('<div class="a-shadow"/>');
        shadow.appendTo('body').addClass('is-active');
        return shadow;
    },

    isShadowVisible: function(){
        return $(this.locators.$shadow).length > 0;
    },

    removeShadow : function(){

        if(App.ui.toggle.locators.activeToggle && App.ui.toggle.locators.activeToggle.data('toggle-shadow')){
            App.ui.toggle.resetToggle(App.ui.toggle.locators.activeToggle)
        }

        $(this.locators.$shadow).removeClass('is-active').remove();


    },
 
    bindEvents : function () {
        let that = this;
        $(document).on('click',this.locators.$shadow,function (e) {
            that.removeShadow($(this),e);
        });
    },

    init: function () {
        this.bindEvents();
    }
    
}