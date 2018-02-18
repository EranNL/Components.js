import Str from "../util/Str.js";
import Element from "./Element.js";

class Events {

  constructor(instance) {
    this.instance = instance;
    this.element = this.instance instanceof Element ? this.instance : this.instance.element;
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
        this.add(this.events[i].substr(2, this.events[i].length).toLowerCase(), (event) => this.instance.__proto__[this.events[i]].call(this.instance, this.element.htmlElement, event));
      }
    }
  }

  /**
   * Adds an event listener to the element
   *
   * @param {String} ev The name of the event
   * @param {Function} callback The callback that has to be invoked when the event occurered.
   *
   * @todo Allow collections of elements
   *
   * @return {void}
   */
  add(ev, callback, selector = null) {
    if( ev === '*' ) {
      for( let i = 0; i < this.events.length; i++ ) {
        this.add(this.events[i], callback, selector);
      }
    }

    if( selector ) {
      this.element.htmlElement.addEventListener(ev, (event) => {
        if( new Element(event.target).matches(selector) ) {
          callback(new Element(event.target), event)
        }
      })
    }
    else {
      if( this.element.htmlElement.addEventListener ) {
        this.element.htmlElement.addEventListener(ev, (event) => callback.call(null, this.element, event));
      }
    }

    this.registeredHandlers[ev] = callback;
  }

  remove(ev) {
    if( ev === '*' ) {
      for( let i = 0; i < this.events.length; i++ ) {
        this.remove(this.events[i]);
      }
    }

    if( this.element.htmlElement.removeEventListener ) {
      this.element.htmlElement.removeEventListener(ev, this.registeredHandlers[ev]);
      delete this.registeredHandlers[ev];
    }
  }
}

export default Events;
