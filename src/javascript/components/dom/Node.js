import Events from "./Events.js";
import HeightDimension from "./dimensions/HeightDimension";
import WidthDimension from "./dimensions/WidthDimension";
import Str from "../util/Str.js";
import Collection from "../util/Collection";
import Effect from "./effects/Effect";
import Component from "../Component";

class Node {

    constructor(element = "") {

        //list of HtmlElements in the DOM matching the given element
        this.nodeList = this._select(element);

        this.events = new Events(this, this.nodeList);

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
     * @return {Node}
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
     * Appends an html string to the elements in the nodelist
     *
     * @param html
     * @returns {Node}
     */
    append(html) {
        if(html instanceof Component) {
            html = html.element.nodeList.get(0);

            this.nodeList.each(node => {
                node.appendChild(html);
            });

            return this;
        }

        this.nodeList.each(node => {
            node.insertAdjacentHTML("beforeend", html);
        });

        return this;
    }

    /**
     * Appends the node to the target (node)
     *
     * @param {Node|string} target The target node
     * @returns {Node}
     */
    appendTo(target) {
        if(typeof target === "string") {
            target = new Node(target);
        }

        target.nodeList.each(targetnode => {
            this.nodeList.each(node => {
                targetnode.insertAdjacentElement("beforeend", node);
            });
        });

        return this;
    }

    /**
     * Get a specific element in the collection
     *
     * @param {number} index The index of the element in the collection
     * @param {boolean} as_plain Whether the returned element should be a node
     * @return {HTMLElement|Node}
     */
    get(index = 0, as_plain = false) {
        return as_plain ? this.nodeList.get(index) : new Node(this.nodeList.get(index));
    }

    /**
     * Filters the nodeList and returns the elements not matching the selector
     * @param selector
     */
    not(selector) {
        let newCollection = this.nodeList.filter(node => {
            return !node.matches(selector);
        });

        return new Node(newCollection);
    }

    /**
     * Returns the parent of this element, or if this element is a collection:
     * all elements from each item in the collection
     *
     * @return {Node}
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

    /**
     * Removes all the children of the node
     *
     * @return {Node}
     */
    clear() {
        this.children().each(node => {
            node.remove();
        });

        return this;
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
     * @returns {Node}
     *
     * @todo Needs cleaning up
     */
    children(selector = "*") {
        let returnChildren = new Collection();

        //O^2
        this.nodeList.each(element => {
            let children = element.children;

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

    /**
     * Finds recursively all children matching the selector
     *
     * @param {String} selector
     */
    find(selector) {
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
     * Adds an class to the element
     *
     * @param {String} className The name of the class you"d like to add
     * @return {Node}
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
     *
     * @param className
     * @return {Node}
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
                        element.setAttribute("class", classes.join(" "));
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
        let has = false;
        this.nodeList.each(node => {
            if(node.getAttribute("class") && node.getAttribute("class").indexOf(className) !== -1) {
                has = true;
            }
        });

        return has;
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
     * @param {String|array} ev String: The name of the event
     *                          Array: List of events
     * @param {Function} callback
     * @return {Node}
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
        this.nodeList.each(node => {
            this.events.remove(node, ev);
        });

        return this;
    }

    /**
     * Triggers a given event on the element
     * @param String ev
     */
    trigger(ev) {
        this.nodeList.each(node => {
            let event = document.createEvent("Event");
            event.initEvent(ev, true, true);

            if (node[ev]) {
                node[ev].call(this.nodeList);
            }
            else {
                node.dispatchEvent(event);
            }
        });
    }

    /**
     * Returns the number of elements in the collection
     *
     * @return {number}
     */
    length() {
        return this.nodeList.length();
    }

    /**
     * Applies a css property to the element
     *
     * @param {String|Object} Object: key-object notation of property-value
     *                        String: The property and value of the to be applied css
     *
     * @return {String|Node}
     */
    css() {
        let properties = {};

        if(arguments.length === 1 && Str.isString(arguments[0])) {
            if(this.nodeList.length()) {
                let value = window.getComputedStyle(this.nodeList.get(0))[arguments[0]].replace("px", "");

                return isNaN(value) ? value : parseFloat(value);
            }

            return null;
        }
        else if (arguments.length === 2 && Str.isString(arguments[0]) && Str.isString(arguments[1])) {
            properties[arguments[0]] = arguments[1];
        }
        else if(arguments[0] === new Object(arguments[0])) {
            //if the argument is an object, retrieve this object
            properties = arguments[0];
        }

        this.nodeList.each(node => {
            for (let key in properties) {
                node.style[key] = properties[key];
            }
        });

        return this;
    }

    animate(css, duration, easing, callback) {
        if (typeof easing === "function") {
            callback = easing;
            easing = null;
        }

        this.nodeList.each(node => {
            new Effect(null, duration, node, easing).animate(css).then(callback);
        });


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
            this.nodeList.each(node => {
                let text = document.createTextNode(value);
                node.innerHTML = text.textContent;
            });

            return this;
        }
        else {
            if (this.children().length()) {
                let returnText = "";

                this.children().nodeList.each(node => {
                    returnText += " " + node.innerText;
                });

                return returnText;
            }
            else {
                return this.nodeList.get(0).innerText;
            }
        }
    }

    /**
     * Selects the next element, or an element with a specific class if that is applied.
     * @param {string} selector Only next elements matching this selector are returned
     * @return {Node}
     *
     */
    next(selector = "*") {

        let nextNodes = new Collection();

        this.nodeList.each(node => {
            if(node.nextElementSibling && node.nextElementSibling.matches(selector)) {
                nextNodes.push(node.nextElementSibling);
            }
        });

        return new Node(nextNodes);
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

        let serializedString = "";
        let valuesObject = {};

        if (this.matches("form") || !form) {
            let formelements = this.find("input, textarea, select");
            for (let i = 0; i < formelements.length(); i++) {
                let input = formelements.get(i, true);
                let nodeName = input.nodeName.toLowerCase();
                let type = input.type;

                if (nodeName === "input" || nodeName === "select" || input === "textarea") {
                    if (type === "file" || type === "reset") {
                    }
                    else if (type === "select-multiple") {
                        let options = input.option;

                        for (let x = 0; x < options.length; x++) {
                            if (options[x].selected) {
                                valuesObject[input.htmlElement.name] = options[x].value;
                            }
                        }
                    }
                    else {
                        if ((type !== "checkbox" && type !== "radio") || input.checked) {
                            valuesObject[input.name] = input.value;
                        }
                    }
                }
            }

            return Str.toURI(valuesObject);
        }

        return null;
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

    onKeyup(event) {
        if (event.stopPropagation) {    // standard
            event.stopPropagation();
            event.stopImmediatePropagation();
        } else {    // IE6-8
            event.cancelBubble = true;
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
            this.trigger("keyup_alphanumeric");
        }
    }
}

export default Node;
