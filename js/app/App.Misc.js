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