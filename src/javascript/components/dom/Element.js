import Events from './Events.js';
import HeightDimension from './dimensions/HeightDimension';
import WidthDimension from './dimensions/WidthDimension';
import FadeEffect from './effects/FadeEffect';
import SlideEffect from './effects/SlideEffect';
import Str from '../util/Str.js';
import Collection from '../util/Collection';

class Element {

	constructor(element = ""){
		this.htmlElement = this._select(element);

		//Register a new Events instance for this element, so events are captured.
		//But only on non-objects
		if( !this.isCollection() ) {
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

		if( !selector ) {
			return;
		}

		if( context instanceof Element ) {
			context = context.htmlElement;
		}

		if ( selector instanceof Collection ) {
		    //asssume that it is a collection of htmlElements
		    return selector.filter(element => {
		        return element instanceof Element;
            });
        }

		if( typeof selector == "string" ) {

			if( selector.indexOf('#') == 0 ) {
				//Selector is an ID
				return context.getElementById(selector.substr(1, selector.length));
			}
			else {
                let elements = context.querySelectorAll(selector);

                for ( let i = 0; i < elements.length; i++ ) {
                    returnElements.push(new Element(elements[i]));
                }
                return returnElements;
            }
		}
		else {
            if( selector.nodeType ) {
                //getElementById, document, document.body
                return selector;
            } else if( selector instanceof HTMLCollection ) {
                //getElementsByClassName or getElementsByClass
                for( let i = 0; i < selector.length; i++ ) {
                    returnElements.push(new Element(selector[i]));
                }
                return returnElements;
            }
        }
	}

    /**
     * Create an element in the DOM. The element can be seen after appending it to an other element
     * @param {String} element The node that has to be created
     * @return {Element}
     */
	static create(element) {
	    if(typeof element === 'string') {
	        return new Element(document.createElement(element));
        }
    }

    /**
     * Appends a htmlElement to the end of this html element
     *
     * @param {*} toBeAppended The element/ selector that has to be appended
     * @return {Element}
     * @todo CLEAN UP!
     */
    append(toBeAppended) {
        if( this.isCollection() ) {
            this.htmlElement.each( element => {
                element.append(toBeAppended);
            });

            return this;
        }
        else {
            if( toBeAppended instanceof Element ) {
                if(toBeAppended.isCollection()) {
                    let html = document.createElement('div');
                    toBeAppended.htmlElement.each(element => {
                        html.innterHtml += element.htmlElement.outerHTML;
                    })

                    while(html.firstChild) {
                        this.htmlElement.appendChild(html.firstChild)
                    }
                }
                else {
                    let html = document.createElement('div');
                    html.innerHTML += toBeAppended.htmlElement.outerHTML;

                    while(html.firstChild) {
                        this.htmlElement.appendChild(html.firstChild);
                    }
                }

            }
            else if(typeof toBeAppended === 'string') {
                let html = document.createElement('div');
                html.innerHTML += toBeAppended;

                while(html.firstChild) {
                    this.htmlElement.appendChild(html.firstChild);
                }
            }
            else {
                toBeAppended = new Element(toBeAppended);
                this.append(toBeAppended);
            }

            return this;
        }
    }

    /**
     * Get a specific element in the collection
     *
     * @param {number} index The index of the element in the collection
     * @return {Element}
     */
    get(index = 0) {
        if( this.isCollection() ) {
            return this.htmlElement.get(index);
        }
        else {
            return this;
        }

    }

    not(selector) {
        if( this.isCollection() ) {
            let newCollection = this.htmlElement.filter(element => {
                return element.matches(selector);
            });

            return newCollection;
        }
        else {

        }
    }

    /**
     * Insert this element before the target element
     *
     * @param {*} target
     * @return {Element}
     */
    before(target) {
        if(this.isCollection()) {
            return;
        }

        if(target instanceof Element) {
            if(target.isCollection()) {
                target.htmlElement.each(element => {
                    element.before(this)
                })
            }
            else {
                target.htmlElement.parentNode.insertBefore(this.htmlElement, target.htmlElement);
            }
        }

        return this;

    }

    /**
     * Adds an element as the first childnode of this element
     * @param {*} toBePrepended
     *
     * @todo: fix events
     */
    prepend(toBePrepended) {
        if( toBePrepended instanceof Element ) {
            if(toBePrepended.isCollection()) {
                let html = '';
                toBePrepended.htmlElement.each(element => {
                    html += element.htmlElement.outerHTML;
                })
                this.htmlElement.innerHTML = html + this.htmlElement.innerHTML;
            }
            else {
                this.htmlElement.innerHTML = toBePrepended.htmlElement.outerHTML + this.htmlElement.innerHTML;
            }

        }
        else if(typeof toBePrepended === 'string') {
            this.htmlElement.innerHTML += toBePrepended;
        }
        else {
            toBePrepended = new Element(toBePrepended);
            this.append(toBePrepended);
        }
    }

    appendTo(selector) {
        if(selector instanceof Element) {
            if(selector.isCollection()) {
                selector.each(element => {
                    element.append(this.htmlElement);
                });
            }
            else {
                selector.append(this.htmlElement);
            }
        }
        else {
            new Element(selector).append(this);
        }

        return this;
    }

    /**
     * Removes this elememt
     */
    remove() {
        if(this.isCollection()) {
            this.htmlElement.each(element => {
                element.remove();
            });
        }
        else {
            this.htmlElement.parentNode.removeChild(this.htmlElement);
        }
    }

    attr(attr, value = null) {
        if(value === null) {
            if(this.isCollection()) {
                return this.htmlElement.get(0).htmlElement.getAttribute(attr);
            }
            else {
                return this.htmlElement.getAttribute(attr);
            }
        }

        if(this.isCollection()) {
            this.htmlElement.each(element => {
                element.setAttr(attr, value);
            })
        }
        else {
            this.htmlElement.setAttribute(attr, value);
        }

        return this;
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
     * 				String: when a key is specified |
     * 				Object: when returning the whole options object
     */
    getData(key) {
        if( !this.htmlElement || this.isCollection() ) {
            return null;
        }

        let returnData = {};
		//@todo: retrieve data from localStorage

        for( let i = 0; i < this.htmlElement.attributes.length; i++ ) {
            let attribute = this.htmlElement.attributes[i];

            if( attribute.name.indexOf('data-') == 0 ) {
                let name = attribute.name.substr("data-".length, attribute.name.length - 1);

                if(name === 'options' && /{.*}/g.test(attribute.value)) {
                    let values = Str.toObject(attribute.value);

                    for(let key in values) {
                        returnData[key] = values[key];
                    }
                }
                else {
                    returnData[name] = /{.*}/g.test(attribute.value) ? Str.toObject(attribute.value) : attribute.value;
                }
            }
        }

        if( key ) {
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
                    callback(this.htmlElement.get(i), i);
				}
			}
		} else {
			if( typeof callback == 'function' ) {
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
    children(selector = "*")
	{
		let returnChildren = new Collection();

		if( this.isCollection() ) {
			this.htmlElement.each(element => {
				let children = this._select(selector, element.htmlElement);

				if( children instanceof Collection ) {
					for( let i = 0; i < children.length(); i++ ) {
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
		    return this._select(selector, this.htmlElement);
        }

	}

    /**
     * Checks whether the element(s) match(es) a specific selector
     * @param {string} selector The selector to be matched
     * @return {boolean} True: The selector matches the (set of) element(s)
     */
	matches(selector) {
	    let matchesElements = true;

	    let match = function(element) {
	        if( typeof selector == 'string' ) {
                let matches = (window.document || window.ownerDocument).querySelectorAll(selector),
                    i = matches.length;

                while (--i >= 0 && matches[i] !== (element instanceof Element ? element.htmlElement : element)) {}
                return i > -1;
            }
            else if ( selector instanceof Element) {
	            return selector.isCollection() ? false : selector.htmlElement === (element instanceof Element ? element.htmlElement : element);
            }
        }

	    if(this.isCollection()) {
	        this.htmlElement.each((element) => {
	            if(!match(element)) {
	                matchesElements = false;
                }
            })
        }
        else {
	        return match(this.htmlElement);
        }

        return matchesElements;
    }

	find(selector) {
        if( typeof selector == 'string' ) {
            let children = this.children(selector)
            //     .filter(element => {
            //     return element.matches(selector);
            // });

            return new Element(children);
        }
    }

    /**
     * Adds an class to the element
	 *
	 * @param {String} className The name of the class youd like to add
	 *
	 * @return {Element}
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

            if( hasClasses === null || hasClasses.length == 0) {
                this.htmlElement.setAttribute("class", className);
            }
            else if( hasClasses.indexOf(className) == -1) {
                this.htmlElement.setAttribute("class", hasClasses + " " + className);
            }
        }

        return this;
    }

    /**
     * Removes the given classname if the element has this class
     * @param className
     * @return {Element}
     */
    removeClass(className) {
        if( this.isCollection() ) {
            this.htmlElement.each(element => {
                //recursively call for each element in the collection
                element.removeClass(className);
            })
        }
        else {
            let classes = this.htmlElement.getAttribute('class');
            let index;
            if(classes !== null) {
                classes = classes.split(' ');
                index = classes.indexOf(className);

                if(index > -1) {
                    classes.splice(index, 1);
                    this.htmlElement.setAttribute('class', classes.join(' '));
                }
            }
        }

        return this;
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
     * Replaces or gets the html of this element
     * @param {*} html
     */
	html(html) {
	    if( this.isCollection() ) {
	        if(html) {
	            this.htmlElement.each(element => {
	                element.html(html);
                })
            }
            else {
                return this.htmlElement.get(0).htmlElement.innerHTML;
            }
        }
        else {
	        if(!html) {
	            return this.htmlElement.innerHTML;
            }
            else if(typeof html == 'string') {
                //Remove the entire content of this element
                while(this.htmlElement.firstChild) {
                    this.htmlElement.removeChild(this.htmlElement.firstChild);
                }

                //fill this element with the new content
                this.append(html);
            }
            else if (typeof html == 'function') {
	            //closures can be used for html manipulations with
                let tempHtml = this.htmlElement.innerHTML;

                while(this.htmlElement.firstChild) {
                    this.htmlElement.removeChild(this.htmlElement.firstChild);
                }

                this.append(html(tempHtml));
            }
        }
    }

    /**
     * Event handler to listen to events occuring on the element and then executing a callback
     * @param {*} ev String: The name of the event
     *               Array: List of events
     * @param {Function} callback
     * @return {Element}
     *
     * @fixme
     */
	on(ev, selector, callback) {
	    if(typeof selector == 'function') {
	        callback = selector;
	        selector = null;
        }
        if( this.isCollection() ) {
            this.htmlElement.each(element => {
                element.events.add(ev, (event) => callback(element, event), selector);
            })
        }
        else {
            this.events.add(ev, (event) => callback(new Element(this.htmlElement), event), selector);
        }

        return this;
	}

    /**
     * Triggers a given event on the element
     * @param String ev
     */
	trigger(ev) {
	    if(this.isCollection()) {
	        this.htmlElement.each(element => {
	            element.trigger(ev);
            })
        }
        else {
            let event = document.createEvent('Event');
            event.initEvent(ev, true, true);

            if(this.htmlElement[ev]) {
                this.htmlElement[ev].call(this.htmlElement);
            }
            else {
                this.htmlElement.dispatchEvent(event);
            }
        }

    }

    /**
     * Returns the number of elements in the collection
     *
     * @return {number}
     */
    length() {
	    if( this.isCollection() ) {
	        return this.htmlElement.length();
        }
        else if (this.htmlElement === null) {
	        return 0;
        }

        return 1;
    }

    /**
     * Applies a css property to the element
     *
     * @param {*} Object: key-object notation of property-value
     *            String, String: The property and value of the to be applied css
     *
     * @return {Element}
     *
     * Todo Fix CSS properties by argument, instead of object
     */
    css() {
        if(arguments.length === 1 && typeof arguments[0] == 'string') {
            let element = this.isCollection() ? this.htmlElement.get(0).htmlElement : this.htmlElement;
            return window.getComputedStyle(element)[arguments[0]];
        }

        if( this.isCollection() ) {
            this.htmlElement.each(element => {
                element.css(arguments);
            })
        }
        else {
            if( typeof arguments[0] == 'object' ) {

                for(let key in arguments[0]) {
                    //console.log(arguments[0][key]);
                    this.htmlElement.style[key] = arguments[0][key];
                }
            }
            else if(arguments.length === 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'string') {
                this.htmlElement.style[arguments[0]] = arguments[1];
            }
        }

        return this;
    }

    /**
	 * Fades the element out
	 *
     * @param {int} duration The duration of the effect in ms
     * @param {function} callback The callback fired when the effect is finished
     */
	fadeOut(duration = 500, easing = null, callback)
    {
		if(this.isCollection()) {
		    for(let i = 0; i < this.htmlElement.length(); i++) {
		        new FadeEffect('out', duration, this.htmlElement.get(i).htmlElement, easing);
            }
        }
        else {
            new FadeEffect('out', duration, this.htmlElement, easing);
        }
	}

	slideLeft(duration = 500, easing = null, callback) {
        if(this.isCollection()) {
            for(let i = 0; i < this.htmlElement.length(); i++) {
                new SlideEffect('left', duration, this.htmlElement.get(i).htmlElement, easing);
            }
        }
        else {
            let effect = new SlideEffect('left', duration, this.htmlElement, easing);
        }
    }

    slideUp(duration = 500, easing = null, callback) {
        if(this.isCollection()) {
            for(let i = 0; i < this.htmlElement.length(); i++) {
                this.htmlElement.get(i).css('height', '2000px');
                new SlideEffect('up', duration, this.htmlElement.get(i).htmlElement, easing);
            }
        }
        else {
            this.css({overflow: 'hidden'});
            let effect = new SlideEffect('up', duration, this.htmlElement, easing);
        }
    }

    /**
     * Returns the value of the element, if that element is an input-like element,
     *
     * @param String value The value to be set to the element
     *
     * @return {*}
     */
    val(value) {
        if(!value) {
            if(this.isCollection()) {
                return "";
            }
            else {
                return this.htmlElement.value;
            }
        }
        else if(typeof value == 'string') {
            if(this.isCollection()) {
                this.htmlElement.each(element => {
                    element.val(value);
                })
            }
            else {
                this.htmlElement.value = value;
            }
        }

        return this;
    }

    /**
     * Selects the next element, or an element with a specific class if that is applied.
     * @param String selector
     * @return {*}
     */
    next(selector) {
	    if(this.isCollection()) {
	        return null;
        }

        if(!selector) {
	        return new Element(this.htmlElement.nextSibling);
        }
        else {
	        let node = this.htmlElement;
	        while(node = node.nextSibling) {
                if((new Element(node)).matches(selector)) {
                    return new Element(node);
                }
            }
            return this;
        }
    }
}

export default Element;
