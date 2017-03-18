import Element from './components/dom/Element.js';
import Str from './components/helpers/Str.js';
import Events from "./components/dom/Events";

"use strict";

/**
 * Main class for the library. This class has to be called with a given context
 * This context is used so
 */

window.componentList = {};

class OctaBootstrap {

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

	static registerComponent(instance, name) {
		if( componentList[name] == undefined ) {
			componentList[name] = instance;
		}
	}

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
					if( componentList[com[i]] != undefined ) {
						new componentList[com[i]](element, OctaBootstrap);
					}
					else {
					    console.error('Module ' + com[i] + 'was not found. Does it exist');
                    }
				}
            }
		})
	}
}

//Put the function in the global window object so it is accessible outside the scope of webpack
window.OctaBootstrap = OctaBootstrap;

/**
 * Overwrite the existing Octa variable
 * @todo Delete after browsers officially support ES6?
 */
window.Octa = window.O = function(element) {
	return new OctaBootstrap(element);
};

