/**
 * Main class for the library. This class has to be called with a given context
 * This context is used so the framework can be initialized in different areas of the website,
 * while other parts can use arrtibutes like 'data-component' for other purposes
 *
 * Besides that, this file provides the wrapper used to simplify Javascript.
 */
import Element from './components/dom/Element.js';
import Str from './components/util/Str.js';
import Events from "./components/dom/Events";
import Keyboard from "./components/util/Keyboard";
import Config from "./components/Config";
import Websocketserver from "./components/http/websockets/Websocketserver";
import Modal from "./framework/Modal";

"use strict";

window.componentList = {'components': {}, 'directives': {}};

class Components {

	/**
	 * @var {Element}
	 *
	 * @todo: Improve!!!
	 */
	constructor(element) {
		 this.context = new Element(element);
		 this.initialized = false;
		 this.init();

		 this.config = new Config();

		 this.startServices();
	}

    /**
	 * Registers a custom plugin to the framework, so it can be used in the HTML.
     * @param {Object} instance The to be registered plugin
     * @param {String} name The name of the plugin
     */
	static registerComponent(instance, name) {
		if( componentList['components'][name] === undefined ) {
			componentList['components'][name] = instance;
		}
	}

	static registerDirective(instance, name) {
        if( componentList['directives'][name] === undefined ) {
            componentList['directives'][name] = instance;
        }
    }

    /**
	 * Static method to register events to a custom plugin
     * @param {Object} instance The object where the events should be attached to
     * @return {Events}
     */
	static registerEvents(instance) {
		return new Events(instance);
	}

	/**
	 * Initialize the framework inside the given context
	 *
	 * @return {void}
	 */
	init() {
		if(!this.initialized) {
			this.context.children('[data-component], [data-directive]').each(element => {
	            let functionMap = {};

				functionMap['components'] = element.getData('component').split(' ');

				if( element.getData('directive') ) functionMap['directives'] = element.getData('directive').split(' ');

				for(let name in functionMap) {
				    //loop through the array that "key" holds
				    for(let i = 0; i < functionMap[name].length; i++) {

				        //@TODO: fix weird empty component,
				        if(!functionMap[name][i]) {
				            continue;
	                    }

				        let componentTree = null;

				        if(/.+[\.].+/.test(functionMap[name][i])) {
				            let tree = functionMap[name][i].split('.');
	                        tree[tree.length - 1] = Str.ucFirst(tree[tree.length - 1]);

	                        componentTree = (name !== 'components' ? name + '/' : '') +
							tree.join('/') +
	                            Str.ucFirst(name.substr(0, name.length - 1));
	                    }
	                    else {
	                        componentTree = (name !== 'components' ? name + '/' : '') +
	                            Str.ucFirst(functionMap[name][i]) +
	                            (name !== 'components' ? Str.ucFirst(name.substr(0, name.length - 1)) : '');
	                    }

	                    try {
	                        let component = require('./framework/' + componentTree + '.js').default;
	                        new component(element);
	                    }
	                    catch ( err ) {
	                        //no module was found, try to fetch it from the array
	                        if( componentList[name][functionMap[name][i]] !== undefined ) {
	                            new componentList[name][functionMap[name][i]](element, Components);
	                        }
	                        else {
	                            console.error(err);
	                            console.error('Module ' + functionMap[name][i] + ' was not found. Does it exist?');
	                        }
	                    }
	                }
	            }
			})

			this.initialized = true;
		}
	}

    /**
     * Returns the websocket server, if it is initialized. Otherwise return null
     *
     * @return {Websocketserver|null}
     */
	static getWebsocketserver() {
	    return this.websocketserver || null;
    }

    /**
     * Return a new Keyboard instance, used to register keyboard events to custom plugins
     * @return {Keyboard}
     */
	static get keyboard() {
	    return new Keyboard;
    }

    /**
	 * Start the services used by this application
	 *
	 * @todo more general way of starting them
     */
    startServices() {
        if(this.config.getBoolean('websockets')) {
            console.log("[Websockets] -> started")
            this.websocketserver = new Websocketserver();
        }
    }
}

//Put the function in the global window object so it is accessible outside the scope of webpack
window.Components = Components;

/**
 * Overwrite the existing ComponentsJS variable
 * @todo Delete after browsers officially support ES6?
 */
window.ComponentsJS = window.CJS = function(element) {
	return new Components(element);
};
