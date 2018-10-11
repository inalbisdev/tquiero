let $ = require('jquery');
let utils = require('../app.utils');
let _ = require('lodash');


module.exports = {

    locators : {
        $trigger: '.js-fav',
        $parent: ".a-fav",
        $icon: '.a-fav__icon',
        toggleClass: 'is-hidden',
        animationTarget : '#favorites',
        favFilled: "a-icon-favorite-filled"
    },

    settings : {
        localStorageKey: 'favorites'
    },

    toggleState: function ($el) {
        let $icons = $el.find(this.locators.$icon);
        $icons.toggleClass(this.locators.toggleClass);
        this.isFavorite($el,$icons);

    },

    createEffect: function (favorite) {
        let offsetTop = utils.getOffsetTop($(this.locators.animationTarget));
        favorite.clone().hide().appendTo('body').addClass('a-fav__icon--cloned');
        let cloned = $(".a-fav__icon--cloned");

        cloned.css({
            top: utils.getOffsetTop(favorite),
            left : utils.centerElementToAnother(favorite,cloned)
        }).show().animate({
            "left" : utils.centerElementToAnother($(this.locators.animationTarget),cloned),
            "top": offsetTop,
        });

    },

    isFavorite : function($el,$icons){
        let isFavorite = $el.find(this.locators.$icon+'.'+this.locators.favFilled).not('.is-hidden');

        if(isFavorite.length > 0){
            this.createEffect(isFavorite);
            this.saveData(this.getDataFromPost(isFavorite));
        }
    },

    createFavorite: function ($el) {
        this.toggleState($el);
    },



    deleteFavById : function (id) {
        let storedData = this.loadData();
        for (let i = 0; i < storedData.length; i++) {
            if (storedData[i].id === id) {
                storedData.splice(i, 1);
            }
        }
        this.saveData(storedData);
        this.renderLocalStorage();

    },



    getDataFromPost : function ($el) {

        let $parent = $el.parents('.m-card');

        return{
            id: $parent.attr('id'),
            image: $parent.find($('source')).data().srcset,
            title: $parent.find($('.m-card__title')).text()
        }
    },

    addDeleteListener : function () {
        let closeButtons = document.getElementsByClassName(this.locators.close);
        for (let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener('click', function (e) {
                this.deleteFavById(e.target.dataset.id)
            });
        }
    },

    saveData : function (data) {
        let newData = this.loadData();
        newData.push(data);
        localStorage.setItem(this.settings.localStorageKey, JSON.stringify(newData));
    },

    loadData : function () {
        let loadedData = localStorage.getItem(this.settings.localStorageKey) || '[]';
        loadedData = JSON.parse(loadedData);
        return loadedData;
    },

    renderLocalStorage : function () {
        let elements = this.loadData(),
            menu = document.getElementsByClassName(this.locators.animationTarget);
        if (menu.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                menu[0].innerHTML += renderLiTag(elements[i]);
            }
        }
    },





    bindEvents: function () {
        let that = this;
        $(this.locators.$parent).on('click',function () {
            that.createFavorite($(this));
        });
    },

    init: function () {
        this.renderLocalStorage();



        if(this.locators.$trigger.length > 0){
            this.bindEvents();
        }
    }
};
