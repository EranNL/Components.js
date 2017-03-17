import Events from './Events.js';
import Str from './../helpers/Str.js';

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
     * Returns the data attributes assigned to the element
     *
     * @example
     * <div data-component="component" data-foo="bar" />
     *
     * @param {String} key (optional) The specific value of a attribute key that has to be returned
     *
     * @return {mixed} 	null: when not a specific element |
     * 				   	String: when a key is specified |
     * 					Object: when returning the whole options object
     */
    getData(key) {
        if(!this.element || this.element.length) {
            return null;
        }

        let returnData = {};
        let i = 0

        for(; i < this.element.attributes.length; i++) {
            let attribute = this.element.attributes[i];

            if(attribute.name.indexOf('data-') == 0) {
                let name = attribute.name.substr("data-".length, attribute.name.length - 1);

                returnData[name] = /{.*}/g.test(attribute.value) ? Str.toObject(attribute.value) : attribute.value;
            }
        }

        if(key) {
            return returnData[key] || "";
        }

        return returnData;
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
                    callback(new Element(this.element[i]), i);
				}
			}
		} else {
			if( typeof callback == 'function') {
                callback(new Element(this.element), 0);
			}
		}
	}

    /**
	 * Gets the children for this element.
     * @returns {Element}
     */
    children( selector )
	{
		return new Element(selector);
	}

    /**
     * Returns the height of the element
     *
     * @returns {number}
     *
     * @todo Improve options for height
     */
	getHeight() {
		return this.element.clientHeight;
	}
}

export default Element;
