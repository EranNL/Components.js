import Element from './components/dom/Element.js';
import Str from './components/helpers/Str.js';

/**
 * Main class for the library. This class has to be called with a given context
 * This context is used so
 */
class OctaBootstrap {

	/**
	 * @var {Element}
	 */
	constructor(element) {
		 this.context = new Element(element);

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
                let component = require('./components/' + Str.ucFirst(com[i]) + '.js').default;
                new component(element);
            }
		})
	}
}

/**
 * Overwrite the existing Octa variable
 * @todo Delete after browsers officially support ES6?
 */
window.Octa = window.O = function(element) {
	return new OctaBootstrap(element);
};

console.log(window);
