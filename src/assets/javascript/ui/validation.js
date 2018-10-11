let $ = require('jquery');

module.exports = {


    locators: {

        $sendButton : "#sendForm"

    },


    isSomeRadioChecked : function($field){

        console.log($field);

        $field.each(function () {
            if(($(this)).is(":checked"))
            {
                console.log('checked')
            }else{
                console.log('no checked')
            }
        });



        let isChecked = $field.is(":checked").length;
        console.log(isChecked);



    },



    validateField : function($field){



        $field.is(":radio") ? this.isSomeRadioChecked($field) : false;






    },


    getRequiredFields : function(fieldSet){

        let $getRequiredFields = $(fieldSet).find('[data-required]');

        this.validateField($getRequiredFields);
    },


    validateForm : function(){

        let that = this;

        let getSteps = $('.m-form-work').find('[data-form-step]');

        $(getSteps).each(function () {
            that.getRequiredFields(this);
        });



    },


    bindEvents: function () {

        let that = this;

        $(this.locators.$sendButton).on('click',function () {
            that.validateForm();
        });


    },


    init: function () {
        this.bindEvents();
    },


};