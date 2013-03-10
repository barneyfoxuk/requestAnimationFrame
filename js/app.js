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
var App =  App || {};

App.Misc = (function () {

    var privateMethod = function() {
        //do something private
    };

    var publicMethod = function() {
        //do something publicly accessable
    };

    var init = function() {
        //initiate the module
    };

    return {
        init:init,
        publicMethod: publicMethod
    };

}());
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

function Dot() {

    var self = this;

    //set up initial variables
    this.x = Math.floor(Math.random()*$(window).width());
    this.y = Math.floor(Math.random()*$(window).height());
    this.radius = Math.floor(Math.random()*100)+30;
    this.vx = 1;
    this.vy = 1;
    this.k = (Math.random()/5)+0.1;
    this.mouseX = 0;
    this.mouseY = 0;

    //create jquery obj
    //this.$el = $('<div class="dot"></div>');
    this.$el = $('<img src="img/smoke.png" class="dot">');

    //style it
    this.$el.css({
        left: this.x+"px",
        top: this.y+"px",
        width: this.radius+"px",
        height: this.radius+"px"
        //background: "rgb("+Math.floor(Math.random()*256)+","+ Math.floor(Math.random()*256)+","+ Math.floor(Math.random()*256)+")"
    });

    //add to page
    $('body').append(this.$el);

    this.updatePosition = function() {
        this.$el.css({
            left: this.x+"px",
            top: this.y+"px"
        });
    };

    this.setMousePos = function(x,y) {
        this.mouseX = x;
        this.mouseY = y;
    };

    this.onFrame = function() {
        //elasticity
        var ax = (this.mouseX - this.x) * this.k;
        var ay = (this.mouseY - this.y) * this.k;
        this.vx += ax;
        this.vy += ay;
        this.vx *= App.settings.easing.inertia;
        this.vy *= App.settings.easing.inertia;
        this.x += this.vx;
        this.y += this.vy;
        this.updatePosition();
    };

    //setup frame update handlar
    document.addEventListener('Timeline:frame', function() {
        self.onFrame();
    });

    window.addEventListener('mousemove', function(e) {
        self.mouseX = e.pageX;
        self.mouseY = e.pageY;
    });
}
function Timeline() {

    function frame(time) {

        var event = new CustomEvent("Timeline:frame", {
            detail: {
                time: new Date()
            },
            bubbles: false,
            cancelable: true
        });

        document.dispatchEvent(event);
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}