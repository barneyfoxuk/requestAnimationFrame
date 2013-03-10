var App =  App || {};

App.Dots = (function () {

    var $dots;

    var easeOut = function(mx, my, x, y) {
        var xd = mx - x;
        var yd = my - y;
        var nx = (x + (xd/5));
        var ny = (y + (yd/5));

        return {x: nx, y: ny};
    };

    var spring = function(mx, my, x, y, $el) {

        var vx = $el.data('animationData').vx;
        var vy = $el.data('animationData').vy;

        var ax = (mx -x)*$el.data('animationData').k;
        var ay = (my -y)*$el.data('animationData').k;
        vx += ax;
        vy += ay;
        vx *= App.settings.easing.inertia;
        vy *= App.settings.easing.inertia;
        x += vx;
        y += vy;

        $el.data('animationData',{
            vx: vx,
            vy: vy,
            k: $el.data('animationData').k
        });


        return {x: x, y: y};
    };

    var onFrame = function() {
        $dots.each(function(i,n) {
            var $n = $(n);

            var x = parseInt($n.css('left'),10);
            var y = parseInt($n.css('top'),10);
            var mx = App.settings.mouseX;
            var my = App.settings.mouseY;

            //console.log("$n.data('animationData')", $n.data('animationData').lnx);

            //var updatedPos = easeOut(mx, my, x, y);
            var updatedPos = spring(mx, my, x, y, $n);

            //console.log('updatedPos', updatedPos);

            $n.css({
                left: updatedPos.x+'px',
                top: updatedPos.y+'px'
            });
        });
    };

    var randomizeStartingPosition = function() {
        var winWidth = $(window).width();
        var winHeight = $(window).height();

        $dots.each(function(i,n) {
            var $n = $(n);
            var k = (Math.random()/5)+0.1;
            $n.data('animationData',{
                vx: 0,
                vy: 0,
                k: k
            });
            //console.log($n);
            $n.css({
                left: Math.floor(Math.random()*winWidth),
                top: Math.floor(Math.random()*winHeight),
                background: "rgb("+Math.floor(Math.random()*256)+","+ Math.floor(Math.random()*256)+","+ Math.floor(Math.random()*256)+")"
            });
        });
    };

    var setup = function() {
        $dots = $('.dot');
        randomizeStartingPosition();
        document.addEventListener('Timeline:frame', onFrame);
    };

    var create = function() {
        for(var i = 0; i < App.settings.dotCount; i++) {
            $('body').append('<div class="dot"></div>');
        }
        setup();
    };

    var init = function() {
        create();
    };

    return {
        init:init
    };

}());