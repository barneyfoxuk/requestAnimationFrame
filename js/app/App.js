var App = App || {};


App.settings = {
    easing: {
        inertia: 0.9
    },
    dotCount: 200
};


App.init = function() {

    var dots = [];

    App.timeline = new Timeline();

    for(var i = 0; i <= App.settings.dotCount; i++) {
        var d = new Dot();
        dots.push(d);
    }

    // $(window).mousemove(function(e) {
    //     var mouseX = e.clientX;
    //     var mouseY = e.clientY;
    //     $.each(dots, function(i,n) {
    //         n.setMousePos(mouseX,mouseY);
    //     });
    // });
};


$(function() {
    var init = false;
    $(window).mousemove(function(e) {
        if(init ===false) {
            App.init();
            init = true;
        }
    });
});
