import Str from "../helpers/Str.js";
import Element from "./Element.js";

class Events {

	constructor(instance) {
		this.instance = instance;
        this.element = this.instance instanceof Element ? this.instance.htmlElement : this.instance.element.htmlElement;

		this.attachEvents();
	}

	/**
	 * Check whether a function exists in the class where this instance is called
	 *
	 * @param {String} func The name of the method
	 *
	 * @return {boolean}
	 */
	functionExists(func) {
		return this.instance.__proto__.hasOwnProperty(String(func));
	}

	/**
	 * Attach the current events to the element of the calling instance
	 *
	 * @return {void}
	 */
	attachEvents() {
		Object.keys(Event.prototype).forEach((ev) => {
			let e = Str.toCamelCase('on ' + ev);
			if(this.functionExists(e)) {
				this.add(ev.toLowerCase(), () => this.instance.__proto__[e].apply(this.instance, [this.element, event]));
			}

    	});
	}

    /**
	 * Adds an event listener to the element
	 *
	 * @param {String} ev The name of the event
	 * @param {Closure} callback The callback that has to be invoked when the event occurered.
	 *
	 * @return {void}
     */
    add(ev, callback) {
        this.element.addEventListener(ev, callback)
	}
}

export default Events;
