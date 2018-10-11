let $ = require('jquery');
let slick = require('slick-carousel');
let lazy = require('lazysizes');

const App = {
    utils: require('./app.utils'),
    ui: require('./app.ui')
};

(function init () {
    window.App = App;
    window.$ = $;
    const initAll= function () {
        App.utils.init();
        App.ui.effectRipple.init();
        App.ui.slider.init();
        App.ui.toggle.init();
        App.ui.cookies.init();
        App.ui.shadow.init();
        App.ui.scrollTop.init();
    };
    initAll();
})();
