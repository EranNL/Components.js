import Events from "./Events.js";
import HeightDimension from "./dimensions/HeightDimension";
import WidthDimension from "./dimensions/WidthDimension";
import Str from "../util/Str.js";
import Collection from "../util/Collection";
import Effect from "./effects/Effect";

class Node {

    constructor(element = "") {

        //list of HtmlElements in the DOM matching the given element
        this.nodeList = this._select(element);

        this.events = new Events(this);

        /**
         * Determines if the element is called by just a tag
         * @type {boolean}
         */
        this.isTag = false;
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

        if (!selector) {
            return returnElements;
        }

        if (selector instanceof Collection) {
            returnElements = selector.filter(element => {
                return element instanceof HTMLElement;
            });
        }

        if (typeof selector === "string") {

            if (selector.indexOf("#") === 0) {
                //Selector is an ID
                returnElements.push(context.getElementById(selector.substr(1, selector.length)));
            }
            else {
                if (selector.indexOf(".") !== 0) {
                    this.isTag = true;
                }

                let elements = context.querySelectorAll(selector);

                for (let i = 0; i < elements.length; i++) {
                    returnElements.push(elements[i]);
                }

                return returnElements;
            }
        }
        else {
            if (selector.nodeType) {
                //getElementById, document, document.body
                returnElements.push(selector);
            } else if (selector instanceof HTMLCollection) {
                //getElementsByClassName or getElementsByClass
                for (let i = 0; i < selector.length; i++) {
                    returnElements.push(selector[i]);
                }
            }
        }

        return returnElements;
    }

    /**
     * Create an element in the DOM. The element can be seen after appending it to an other element
     * @param {String} element The node that has to be created
     * @return {Element}
     */
    static create(element) {
        if (typeof element === "string") {
            return new Node(document.createElement(element));
        }
    }

    /**
     * Clones all the nodes in nodeList, along with their children
     *
     * @return {Node}
     */
    clone() {
        let clonedNodes = new Collection();

        this.nodeList.each(node => {
            let clone = node.cloneNode(true);
            clonedNodes.push(clone);
        });

        return new Node(clonedNodes);
    }

    /**
     * Appends a htmlElement to the end of this html element
     *
     * @param {Node|String} target The element after which the elements will be copied
     * @return {void}
     */
    copyAfter(target) {
        this.copy("afterend", target);
    }

    /**
     * Copies all the elements in de nodeList before the target element
     *
     * @param {Node|string} target The element before which the elements will be copied
     * @return {void}
     */
    copyBefore(target) {
        this.copy("beforebegin", target);
    }

    /**
     * Copies all the elements to the given position
     *
     * @param {string} where The position to be copied to
     * @param {Node|string} target the element to be copied
     */
    copy(where, target) {
        if (typeof target === "string") {
            target = new Node(target);
        }

        this.clone().nodeList.each(node => {
            target.nodeList.each(targetnode => {
                targetnode.insertAdjacentElement(where, node);
            });
        });
    }

    /**
     * Moves all the elements in de nodeList after the target element
     * @param {Node|string} target The element after which the elements will be moved
     */
    moveAfter(target) {
        this.copyAfter(target);

        this.remove();
    }

    /**
     * Moves all the elements in the nodeList before the target element
     * @param {Node|string} target The element before which the elements will be moved
     */
    moveBefore(target) {
        this.copyBefore(target);

        this.remove();
    }

    /**
     * Get a specific element in the collection
     *
     * @param {number} index The index of the element in the collection
     * @return {Element}
     */
    get(index = 0) {
        return this.nodeList.get(index);
    }

    not(selector) {
        if (this.isCollection()) {
            let newCollection = this.nodeList.filter(element => {
                return !element.matches(selector);
            });

            return new Element(newCollection);
        }
    }

    /**
     * Returns the parent of this element, or if this element is a collection:
     * all elements from each item in the collection
     * @return {Element}
     *
     * @todo match selector
     */
    parent() {
        let parentCollection = new Collection();

        this.nodeList.each(element => {
            parentCollection.push(element.parentNode);
        });

        return new Node(parentCollection);
    }

    /**
     * Removes this elememt
     */
    remove() {
        this.nodeList.each(element => {
            element.parentNode.removeChild(element);
        });
    }

    attr(attr, value = null) {
        if (!value) {
            return this.nodeList.length() ? this.nodeList.get(0).getAttribute(attr) : null;
        }
        else {
            this.nodeList.each(element => {
                element.setAttribute(attr, value);
            });
        }

        return this;
    }

    removeAttr(attr) {
        if (this.isCollection()) {
            this.nodeList.each(element => {
                element.removeAttr(attr);
            });
        }
        else {
            this.nodeList.removeAttribute(attr);
        }

        return this;
    }

    /**
     * Returns whether the htmlElement is a collection (a set of elements)
     *
     * @return {boolean}
     */
    isCollection() {
        return Collection.isCollection(this.nodeList);
    }

    /**
     * Returns the data attributes assigned to the element
     *
     * @example
     * <div data-component="component" data-foo="bar" />
     *
     * @param {String} attribute (optional) The specific value of a attribute key that has to be returned
     *
     * @return {*}    null: when not a specific element |
     *                String: when a key is specified |
     *                Object: when returning the whole options object
     */
    getData(attribute = null) {

        let returnData = {};
        //@todo: retrieve data from localStorage

        let first = this.nodeList.first();

        for (let i = 0; i < first.attributes.length; i++) {
            let attribute = first.attributes[i];

            if (attribute.name.indexOf("data-") === 0) {
                let name = attribute.name.substr("data-".length, attribute.name.length - 1);

                if (name === "options" && /{.*}/g.test(attribute.value)) {
                    let values = Str.toObject(attribute.value);

                    for (let key in values) {
                        returnData[key] = values[key];
                    }
                }
                else {
                    returnData[name] = /{.*}/g.test(attribute.value) ? Str.toObject(attribute.value) : attribute.value;
                }
            }
        }

        if (attribute) {
            return returnData[attribute] || "";
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
        if (typeof callback === "function") {
            for (let i = 0; i < this.nodeList.length(); i++) {
                callback(new Node(this.nodeList.get(i)), i);
            }
        }
    }

    /**
     * Gets the children for this element.
     *
     * @param {String|Node} selector Selector to filter the children elements
     * @returns {Collection}
     *
     * @todo Needs cleaning up
     */
    children(selector = "*") {
        let returnChildren = new Collection();


        //O^2
        this.nodeList.each(element => {
            let children = element.querySelectorAll(selector);

            for (let i = 0; i < children.length; i++) {
                if (children[i].matches(selector)) {
                    returnChildren.push(children[i]);
                }
            }
        });

        return new Node(returnChildren);

    }

    /**
     * Checks whether the element(s) match(es) a specific selector
     *
     * @param {string} selector The selector to be matched
     * @return {boolean} True: The selector matches the (set of) element(s)
     */
    matches(selector) {
        let matchesElements = false;

        this.nodeList.each(element => {
            if (element === selector || element.matches(selector)) {
                matchesElements = true;
            }
        });

        return matchesElements;
    }

    find(selector) {
        if (typeof selector === "string") {
            let children = this.children(selector).filter(element => {
                return element.matches(selector);
            });

            if (children.length() === 1) {
                return children.get(0);
            }

            return new Node(children);
        }
    }

    /**
     * Adds an class to the element
     *
     * @param {String} className The name of the class you"d like to add
     *
     * @return {Element}
     */
    addClass(className) {
        this.nodeList.each(element => {
            let hasClasses = element.getAttribute("class");

            if (hasClasses === null || hasClasses.length === 0) {
                element.setAttribute("class", className);
            }
            else if (hasClasses.indexOf(className) === -1) {
                element.setAttribute("class", hasClasses + " " + className);
            }
        });

        return this;
    }

    /**
     * Removes the given classname if the element has this class
     * @param className
     * @return {Element}
     */
    removeClass(className) {
        className = Array.isArray(className) ? className : [className];

        this.nodeList.each(element => {
            let classes = element.getAttribute("class"),
                index;

            for (let i = 0; i < className.length; i++) {
                if (classes !== null) {
                    classes = classes.split(" ");
                    index = classes.indexOf(className[i]);

                    if (index > -1) {
                        classes.splice(index, 1);
                        this.nodeList.setAttribute("class", classes.join(" "));
                    }
                }
            }
        });

        return this;
    }

    /**
     * Checks whether the element has a specific class
     *
     * @param {String} className The class the lement has to have
     * @return {boolean}
     */
    hasClass(className) {
        this.nodeList.each(element => {
            if(element.getAttribute("class") && this.nodeList.getAttribute("class").indexOf(className) !== -1) {
                return true;
            }
        });
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
        if (this.isCollection()) {
            if (html) {
                this.nodeList.each(element => {
                    element.html(html);
                });
            }
            else {
                return this.nodeList.get(0).htmlElement.innerHTML;
            }
        }
        else {
            if (!html) {
                return this.nodeList.innerHTML;
            }
            else if (typeof html === "string") {
                //Remove the entire content of this element
                while (this.nodeList.firstChild) {
                    this.nodeList.removeChild(this.nodeList.firstChild);
                }

                //fill this element with the new content
                this.append(html);
            }
            else if (typeof html === "function") {
                //closures can be used for html manipulations
                let tempHtml = this.nodeList.innerHTML;

                while (this.nodeList.firstChild) {
                    this.nodeList.removeChild(this.nodeList.firstChild);
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
        if (typeof selector === "function") {
            callback = selector;
            selector = null;
        }

        ev = Array.isArray(ev) ? ev : [ev];
        this.nodeList.each(element => {
            for (let i = 0; i < ev.length; i++) {
                this.events.add(element, ev[i], callback, selector);
            }
        });

        return this;
    }

    /**
     * Removes an event handler from the element
     *
     * @param ev
     * @param selector
     * @param callback
     */
    off(ev) {
        if (this.isCollection()) {
            this.nodeList.each(element => {
                element.events.remove(ev);
            });
        }
        else {
            this.events.remove(ev);
        }
    }

    /**
     * Triggers a given event on the element
     * @param String ev
     */
    trigger(ev) {
        if (this.isCollection()) {
            this.nodeList.each(element => {
                element.trigger(ev);
            });
        }
        else {
            let event = document.createEvent("Event");
            event.initEvent(ev, true, true);

            if (this.nodeList[ev]) {
                this.nodeList[ev].call(this.nodeList);
            }
            else {
                this.nodeList.dispatchEvent(event);
            }
        }

    }

    /**
     * Returns the number of elements in the collection
     *
     * @return {number}
     */
    length() {
        if (this.isCollection()) {
            return this.nodeList.length();
        }
        else if (this.nodeList === null) {
            return 0;
        }

        return 1;
    }

    /**
     * Applies a css property to the element
     *
     * @param {String|Object} Object: key-object notation of property-value
     *                        String: The property and value of the to be applied css
     *
     * @return {String|Element}
     *
     * Todo Fix CSS properties by argument, instead of object
     */
    css() {
        let properties = arguments;

        if (Object.prototype.toString.call(arguments[0]) === "[object Object]") {
            properties = arguments[0];
        }
        else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            properties = {};
            properties[arguments[0]] = arguments[1];
        }

        if (properties.length === 1 && typeof properties[0] === "string") {
            let element = this.isCollection() ? this.nodeList.get(0).htmlElement : this.nodeList;
            return window.getComputedStyle(element)[properties[0]];
        }

        if (this.isCollection()) {
            this.nodeList.each(element => element.css(properties));
        }
        else {
            for (let key in properties) {
                this.nodeList.style[key] = properties[key];
            }
        }

        return this;
    }

    animate(css, duration, easing, callback) {
        if (typeof easing === "function") {
            callback = easing;
            easing = null;
        }

        if (this.isCollection()) {
            for (let i = 0; i < this.nodeList.length(); i++) {
                new Effect(null, duration, this.nodeList.get(i).htmlElement, easing).animate(css).then(callback);
            }
        }
        else {
            new Effect(null, duration, this.nodeList, easing).animate(css).then(callback);
        }

    }

    /**
     * Returns the value of the element, if that element is an input-like element,
     *
     * @param {String} value The value to be set to the element
     *
     * @return {*}
     */
    val(value = null) {
        if (value === null) {
            let returnVal = "";
            this.nodeList.each(element => {
                returnVal += " " + element.value;
            });

            return returnVal.trim();
        }
        else if (typeof value === "string") {
            this.nodeList.each(element => {
                element.value = value;
            });
        }

        return this;
    }

    /**
     * Returns the text within the element, or sets the text of the element
     *
     * @param {String} value The value to be set as the inner text
     * @return {String|void}
     */
    text(value = null) {

        if (value !== null) {
            if (this.isCollection()) {
                this.nodeList.each(element => element.text(value));
            }
            else {
                let text = document.createTextNode(value);
                this.nodeList.innerHTML = text.textContent;
            }
        }
        else {
            if (this.children().length()) {
                let returnText = "";

                this.children().each(element => {
                    returnText += " " + element.text();
                });

                return returnText;
            }
            else {
                return this.nodeList.innerText;
            }
        }

        return this;
    }

    /**
     * Selects the next element, or an element with a specific class if that is applied.
     * @param String selector
     * @return {*}
     *
     * @todo no selector removes the element itself
     */
    next(selector) {
        if (this.isCollection()) {
            return null;
        }

        if (!selector) {
            return new Element(this.nodeList.nextSibling);
        }
        else {
            let node = this.nodeList;
            while ((node = node.nextSibling)) {
                if ((new Element(node)).matches(selector)) {
                    return new Element(node);
                }
            }
        }

        return new Element;
    }

    /**
     * Serializes the form data in a URI string
     *
     * @param {boolean} form Whether the serialized element is a form
     * @return {String|null} The encodes form data or null
     *
     * @todo FIX
     */
    serialize(form = true) {

        if (!this.nodeList) {
            return null;
        }

        let serializedString = "";

        if (this.isCollection()) {
            this.nodeList.each(element => {
                serializedString += element.serialize(form);
            });
        }
        else {
            let valuesObject = {};

            if (this.nodeList.nodeName.toLowerCase() === "form" || !form) {
                for (let i = 0; i < this.children().length(); i++) {
                    let input = this.children().get(i);
                    let nodeName = input.htmlElement.nodeName.toLowerCase();
                    let type = input.htmlElement.type;

                    if (nodeName === "input" || nodeName === "select" || input === "textarea") {
                        if (type === "file" || type === "reset") {
                            continue;
                        }
                        else if (type === "select-multiple") {
                            let options = input.htmlElement.option;

                            for (let x = 0; x < options.length; x++) {
                                if (options[x].selected) {
                                    valuesObject[input.htmlElement.name] = options[x].value;
                                }
                            }
                        }
                        else {
                            if ((type !== "checkbox" && type !== "radio") || input.htmlElement.checked) {
                                valuesObject[input.htmlElement.name] = input.htmlElement.value;
                            }
                        }
                    }

                }

                return Str.toURI(valuesObject);
            }

            return null;
        }
    }

    scrollDown() {
        if (this.isCollection()) {
            this.nodeList.each(element => {
                element.scrollDown();
            });
        }
        else {
            this.nodeList.scrollTop = this.nodeList.scrollHeight;
        }

        return this;
    }
}

export default Node;
