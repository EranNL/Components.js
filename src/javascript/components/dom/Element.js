import Events from './Events.js';

class Element {

	constructor(element = ""){
		this.element = this._select(element);
		//this.options = this.data();

		//Register a new Events instance for this element, so events are captured.
		//But only on non-objects
		if(!this.element.length) {
			this.events = new Events(this);
		}
	}

	/**
	 *
	 * Returns the HTMLobject element that can be used
	 *
	 * @param {mixed}
	 *
	 * @private
	 */
	_select(selector) {

		let returnElements = [];

		if(!selector) {
			return;
		}

		if(typeof selector == "string") {
			var selectorType = "querySelectorAll";

			if(selector.indexOf('#') == 0) {
				//Selector is an ID
				selectorType = 'getElementById';
				selector = selector.substr(1, selector.length);
			}

			return document[selectorType](selector);
		}

		if(selector.nodeType) {
			//getElementById, document, document.body
			return selector;
		} else if (selector.length) {
			//getElementsByClassName or getElementsByClassName
			for(let i = 0; i < selector.length; i++) {
				returnElements.push(new self(selector[i]));
			}
		}
		return returnElements;
	}

	/**
	 * Add an event to the element(s)
	 *
	 * @param {String} ev The name of the event
	 * @param {closure} callback The callback that has to be fired when the event is triggered
	 *
	 * @return {void}
	 */
	addEvent(ev, callback) {
		this.element.addEventListener(ev, callback);
	}

	/**
	 * Call a callback for every element in the element object or just the only element that is specified
	 *
	 * @param {closure} callback The callback thas has to be called on every element
	 *
	 * @return {void}
	 */
	each(callback) {
		if( typeof this.element == "object" ) {
			for( let i = 0; i < this.element.length; i++ ) {
				if( typeof callback == 'function' ) {
                    callback(this.element[i], i);
				}
			}
		} else {
			if( typeof callback == 'function') {
                callback(this.element, 0);
			}
		}
	}

    /**
	 * Gets the children for this element.
     * @returns {number}
     */
    getChildren()
	{

	}


	getHeight() {
		return this.element.clientHeight;
	}
}

export default Element;
