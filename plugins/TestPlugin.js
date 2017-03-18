

const TestPlugin = function (element, engine) {
    "use strict";
    this.element = element;

    //Register the custom event handler to this instance
    OctaBootstrap.registerEvents(this);
};

TestPlugin.prototype = {
    onClick: function () {
        alert('this shit fucking works');
    },

};

OctaBootstrap.registerComponent(TestPlugin, 'testplugin');
