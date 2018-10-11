let $ = require('jquery');
let utils = require('../app.utils');
let slick = require('slick-carousel');


module.exports = {

    locators: {
        $trigger: '.js-slick'
    },


    getSliderConfiguration: function ($el) {
        return $el.data();
    },

    renderProgressDots: function ($el, speed) {

        let $dotsParent = $('.slick-dots', $el),
            progressClass = 'dots-progress',
            $dotsElement = $('li.slick-active', $dotsParent),
            $dotsElementHasProgress = $('.' + progressClass, $dotsElement).length > 0,
            $progress = $('<div/>').addClass(progressClass);

        if ($dotsElementHasProgress) {
            $('.' + progressClass).remove();
        }

        $dotsElement.append($progress);

        let getProgress = $('.' + progressClass, $dotsElement),
            cssProgress = {
                "transition": (speed / 1000) + 's linear',
                "width": "100%"
            };

        getProgress.css(cssProgress);


    },


    initSlider: function ($el) {


        let conf = this.getSliderConfiguration($el);

        let hasProgressDots = conf.progressDots,
            autoPlaySpeed = conf.slick.autoplaySpeed ? conf.slick.autoplaySpeed : 0,
            that = this;

        if (hasProgressDots) {
            $el.on('init afterChange swipe', function () {
                that.renderProgressDots($el, autoPlaySpeed);
            });
        }
        $el.slick({
            nextArrow: '<a class="slick-arrow--left a-icon a-icon-arrow-left a-icon--x4"></a>',
            prevArrow: '<a class="slick-arrow--right a-icon a-icon-arrow-right a-icon--x4"></a>',
        });

        $('.slick-dots li').on('click', function() {
            that.renderProgressDots($(this).parents(that.locators.$trigger),autoPlaySpeed)
        });

    },


    getSlidersNotInitialized : function(el){
        return $(el).filter(':not(.slick-initialized)');
    },

    initSliderIfOnViewPort: function(that){

        this.getSlidersNotInitialized(this.locators.$trigger).each(function () {
            if(utils.isElementOnViewPort($(this))){
                that.initSlider($(this));
            }
        });
    },

    bindEvents: function () {

        let that = this;

        document.addEventListener('scroll',function () {
            that.initSliderIfOnViewPort(that);
        },utils.supportPassiveEvents() ? {passive: true} : false);

        $(document).ready(function () {
            that.initSliderIfOnViewPort(that);
        });


    },

    init: function () {
        this.bindEvents();
    }

};