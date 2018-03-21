import Str from "../util/Str.js";
import Node from "./Node.js";

class Events {

    constructor(instance) {
        this.instance = instance;
        this.elements = this.instance.element ? this.instance.element.nodeList : this.instance.nodeList;
        this.events = [];
        this.registeredHandlers = {};

        this.getDOMEvents();

        this.attachEvents();
    }

    /**
   * Gets a list of possible DOM events
   *
   * @return {void}
   */
    getDOMEvents() {
        for( let event in document.__proto__ ) {
            if( event.substr(0, 2) === "on" ) {
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
        let elements = this.elements.length(),
            xlength = this.events.length;



        for(let i = 0; i < elements; i++ ) {
            for(let x = 0 ; x < xlength; x++) {

                //walk through all the possible events and check if
                //the instance has the method in his prototype
                if( this._functionExists(this.events[x]) ) {
                    let ev = this.events[x].substr(2, this.events[x].length).toLowerCase();


                    //If so, attach the calling of the prototype method to the event
                    this.add(this.elements.get(i), ev, (e, event) => {
                        this.instance.__proto__[this.events[x]].call(this.instance, event);
                    });
                }
            }
        }
    }

    /**
   * Adds an event listener to the element
   *
   * @param {String} ev The name of the event
   * @param {Function} callback The callback that has to be invoked when the event occurered.
   *
   *
   * @return {void}
   */
    add(el, ev, callback, selector = null) {
        if( selector ) {
            el.addEventListener(ev, (event) => {
                if( new Node(event.target).matches(selector) ) {
                    callback(new Node(event.target), event);
                }
            });
        }
        else {
            if( el.addEventListener ) {
                el.addEventListener(ev, (event) => callback.call(null, new Node(el), event));
            }
        }

        this.registeredHandlers[ev] = callback;
    }

    remove(el, ev) {

        if( el.removeEventListener ) {
            el.removeEventListener(ev, this.registeredHandlers[ev]);
            delete this.registeredHandlers[ev];
        }
    }
}

export default Events;
