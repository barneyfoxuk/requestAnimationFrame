var App = App || {};


App.settings = {
    easing: {
        inertia: 0.9
    },
    dotCount: 50
};


App.init = function() {

    var init = false;

    App.timeline = new Timeline();

    $(window).mousemove(function(e) {
        App.settings.mouseX = e.clientX;
        App.settings.mouseY = e.clientY;

        if(init === false) {
            App.Dots.init();
            init = true;
        }
    });


};


$(function() {
    App.init();
});
