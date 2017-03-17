import Str from '../helpers/Str.js';
import Element from './Element.js';

class Events {

	constructor(instance) {
		this.instance = instance;

		this._attachEvents();
	}

	/**
	 * Check whether a function exists in the class where this instance is called
	 *
	 * @param {String} func The name of the method
	 *
	 * @return {boolean}
	 */
	functionExists(func) {
		return String(func) in this.instance.__proto__;
	}

	/**
	 * Attach the current events to the element of the calling instance
	 *
	 * @return {void}
	 */
	_attachEvents() {
		let element = this.instance instanceof Element ? this.instance : this.instance.element;

		Object.keys(Event.prototype).forEach((ev) => {
			let e = Str.toCamelCase('on ' + ev);
			if(this.functionExists(e)) {
				element.addEvent(ev.toLowerCase(), () => this.instance.__proto__[e].apply(this.instance, [event]));
				return;
			}

    	});
	}
}

export default Events;
