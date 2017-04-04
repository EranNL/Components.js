import Events from './Events.js';
import HeightDimension from './dimensions/HeightDimension';
import WidthDimension from './dimensions/WidthDimension';
import FadeEffect from './effects/FadeEffect';
import Str from '../util/Str.js';
import Collection from '../util/Collection';

class Element {

	constructor(element = ""){
		this.htmlElement = this._select(element);
		//this.options = this.data();

		//Register a new Events instance for this element, so events are captured.
		//But only on non-objects
		if( !this.isCollection() ) {
			this.events = new Events(this, true);
		}
		else {
		    this.events = new Events(this);
        }
	}

	/**
	 *
	 * Returns the HTMLobject element that can be used
	 *
	 * @param {*} selector
	 *
	 * @private
	 */
	_select(selector, context = document) {

		let returnElements = new Collection();

		if(!selector) {
			return;
		}

		if(context instanceof Element) {
			context = context.htmlElement;
		}

		if(typeof selector == "string") {

			if(selector.indexOf('#') == 0) {
				//Selector is an ID
				return context.getElementById(selector);
			}
			else {
                let elements = context.querySelectorAll(selector);

                for (let i = 0; i < elements.length; i++) {
                    returnElements.push(new Element(elements[i]));
                }
                return returnElements;
            }
		}
		else {
            if(selector.nodeType) {
                //getElementById, document, document.body
                return selector;
            } else if (selector instanceof NodeList) {
                //getElementsByClassName or getElementsByClass
                for(let i = 0; i < selector.length; i++) {
                    returnElements.push(new Element(selector[i]));
                }
                return returnElements;
            }
        }
	}

    /**
	 * Returns whether the htmlElement is a collection (a set of elements)
	 *
	 * @return {boolean}
     */
	isCollection() {
		return this.htmlElement instanceof Collection;
	}

    /**
     * Returns the data attributes assigned to the element
     *
     * @example
     * <div data-component="component" data-foo="bar" />
     *
     * @param {String} key (optional) The specific value of a attribute key that has to be returned
     *
     * @return {*} 	null: when not a specific element |
     * 				   	String: when a key is specified |
     * 					Object: when returning the whole options object
     */
    getData(key) {
        if(!this.htmlElement || this.isCollection()) {
            return null;
        }

        let returnData = {};
        let i = 0
		//@todo: retrieve data from localStorage

        for(; i < this.htmlElement.attributes.length; i++) {
            let attribute = this.htmlElement.attributes[i];

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
	 * Call a callback for every element in the element object or just the only element that is specified
	 *
	 * @param {Function} callback The callback thas has to be called on every element
	 *
	 * @return {void}
	 */
	each(callback) {
		if( this.isCollection() ) {
			for( let i = 0; i < this.htmlElement.length(); i++ ) {
				if( typeof callback == 'function' ) {
                    callback(new Element(this.htmlElement.get(i)), i);
				}
			}
		} else {
			if( typeof callback == 'function') {
                callback(new Element(this.htmlElement), 0);
			}
		}
	}

    /**
	 * Gets the children for this element.
     * @returns {Element}
	 *
	 * @todo Needs cleaning up
     */
    children( selector = "*")
	{
		let returnChildren = new Collection();

		if( this.isCollection() ) {
			this.htmlElement.each(element => {
				let children = this._select(selector, element.htmlElement);

				if(children instanceof Collection) {
					for(let i = 0; i < children.length(); i++) {
						returnChildren.push(children.get(i));
					}
				}
				else {
					//child is a single HTMLelement
					returnChildren.push(new Element(children))
				}
			})

            return returnChildren;
		}
		else {
		    return new Element(this._select(selector, this.htmlElement));
        }

	}

    /**
     * Adds an class to the element
	 *
	 * @param {String} className The name of the class youd like to add
	 *
	 * @return {void}
     */
    addClass(className) {
        if( this.isCollection() ) {
            this.htmlElement.each(element => {
                //recursively call for each element in the collection
                element.addClass(className);
            })
        }
        else {
            let hasClasses = this.htmlElement.getAttribute("class");

            if(hasClasses.length == 0) {
                this.htmlElement.setAttribute("class", className);
            }
            else if( hasClasses.indexOf(className) == -1) {
                this.htmlElement.setAttribute("class", hasClasses + " " + className);
            }
        }
    }

    /**
	 * Checks whether the element has a specific class
	 *
     * @param {String} className The class the lement has to have
	 * @return {boolean}
     */
    hasClass(className) {
    	if( this.isCollection() ) {
    	    return false;
        }

        return this.htmlElement.getAttribute("class").indexOf(className) != -1;
	}

    /**
     * Returns the height of the element
     *
     * @returns {HeightDimension}
     *
     */
	getHeight() {
		return new HeightDimension(this);
	}

    /**
	 * Returns the width of the element
	 *
	 * @return {WidthDimension}
     */
	getWidth() {
		return new WidthDimension(this);
	}

    /**
     * Event handler to listen to events occuring on the element and then executing a callback
     * @param {*} ev String: The name of the event
     *               Array: List of events
     * @param {Function} callback
     */
	on(ev, callback) {
	    if( this.isCollection() ) {
            if(typeof ev == 'object' ) {
                for(let i = 0; i < ev.length; i++) {
                    this.htmlElement.each(element => {
                        element.events.add(ev[i], (event) => callback(new Element(element.htmlElement), event));
                    })
                }
            }
        }
        else {
            this.events.add(ev, (event) => callback(new Element(this.htmlElement), event));
        }
	}

    /**
     * Applies a css property to the element
     *
     * @param {*} Object: key-object notation of property-value
	 * @param {}
     *
     * @return {void}
     */
    css() {
        if( this.isCollection() ) {
            this.htmlElement.each(element => {
                element.css(arguments);
            })
        }
        else {
            if(typeof arguments == 'object') {
                for(let key in arguments[0]) {
                    this.htmlElement.style[key] = arguments[0][key];
                }
            } else if (typeof arguments[0] == 'string' && typeof arguments[1] == 'string') {
                this.htmlElement.style[arguments[0]] = arguments[1];
            }
        }
    }

    /**
	 * Fades the element out
	 *
     * @param {int} duration The duration of the effect in ms
     * @param {function} callback The callback fired when the effect is finished
     */
	fadeOut(duration, callback) {

		if(this.htmlElement instanceof Collection) {
		    for(let i = 0; i < this.htmlElement.length(); i++) {
		        new FadeEffect('out', 500, this.htmlElement.get(i));
            }
        }
        else {
            new FadeEffect('out', 500, this.htmlElement);
        }
	}

	getRawElement() {
	    if(!(this.htmlElement instanceof Collection)) {
	        //element is a single element
            return this.htmlElement;
        }

        return null;
    }
}

export default Element;
