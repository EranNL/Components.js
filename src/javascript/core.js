import Element from './components/dom/Element.js';

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

		 return this.context;
	 }

	/**
	 * Initialize the framework inside the given context
	 *
	 * @return {void}
	 */
	init() {
		this.context.children('[data-component]').each(element => {

		})
	}
}

/**
 * Overwrite the existing Octa variable
 * @todo Delete after browsers officially support ES6?
 */
function Octa(element) {
	return new OctaBootstrap(element);
}
