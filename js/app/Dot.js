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