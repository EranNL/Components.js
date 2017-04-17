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

"use strict";

window.componentList = {};

class Components {

	/**
	 * @var {Element}
	 *
	 * @todo: Improve!!!
	 */
	constructor(element, init) {
		 if( init ) {
             this.context = new Element(element);
		 }
		 else {
		 	return new Element(element);
		 }
	}

    /**
	 * Registers a custom plugin to the framework, so it can be used in the HTML.
     * @param {Object} instance The to be registered plugin
     * @param {String} name The name of the plugin
     */
	static registerComponent(instance, name) {
		if( componentList[name] === undefined ) {
			componentList[name] = instance;
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
		this.context.children('[data-component]').each(element => {
			let com = element.getData('component').split(' ');
			let i = 0;

			for(; i < com.length; i++) {
				try {
                    let component = require('./components/' + Str.ucFirst(com[i]) + '.js').default;
                    new component(element);
				}
				catch ( err ) {
					//no module was found, try to fetch it from the array
					if( componentList[com[i]] !== undefined ) {
						new componentList[com[i]](element, Components);
					}
					else {
                        console.error(err);
					    console.error('Module ' + com[i] + 'was not found. Does it exist?');
                    }
				}
            }
		})
	}

    /**
     * Return a new Keyboard instance, used to register keyboard events to custom plugins
     * @return {Keyboard}
     */
	static get keyboard() {
	    return new Keyboard;
    }
}

//Put the function in the global window object so it is accessible outside the scope of webpack
window.Components = Components;

/**
 * Overwrite the existing Octa variable
 * @todo Delete after browsers officially support ES6?
 */
window.ComponentsJS = window.CJS = function(element, init) {
	return new Components(element, init);
};

