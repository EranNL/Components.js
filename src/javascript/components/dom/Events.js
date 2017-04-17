import Str from "../util/Str.js";
import Element from "./Element.js";

class Events {

	constructor(instance) {
		this.instance = instance;
        this.element = this.instance instanceof Element ? this.instance.htmlElement : this.instance.element.htmlElement;
		this.events = [];

		this.getDOMEvents();

		this.attachEvents();
	}

    /**
	 * Gets a list of possible DOM events
	 *
	 * @return {void}
     */
    getDOMEvents() {
    	for( event in document.__proto__ ) {
    		if( event.substr(0, 2) === 'on' ) {
    			this.events.push(event.substr(0, 2) + Str.ucFirst(event.substr(2, event.length)));
			}
		}
	}


	/**
	 * Check whether a function exists in the class where this instance is called
	 *
	 * @param {String} func The name of the method
	 *
	 * @return {boolean}
	 *
	 * @private
	 */
	_functionExists(func) {
		return this.instance.__proto__.hasOwnProperty(String(func));
	}

	/**
	 * Attach the current events to the element of the calling instance
	 *
	 * @return {void}
	 */
	attachEvents() {
		for( let i = 0; i < this.events.length; i++ ) {
			if( this._functionExists(this.events[i]) ) {
				this.add(this.events[i].substr(2, this.events[i].length).toLowerCase(), () => this.instance.__proto__[this.events[i]].apply(this.instance, [this.element, event]));
			}
    	}
	}

    /**
	 * Adds an event listener to the element
	 *
	 * @param {String} ev The name of the event
	 * @param {Function} callback The callback that has to be invoked when the event occurered.
	 *
	 * @return {void}
     */
    add(ev, callback) {
        this.element.addEventListener(ev, callback)
	}
}

export default Events;
