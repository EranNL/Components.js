import Node from "../dom/Node";

class Keyboard {

    /**
     * List with keycodes and their name
     * @type {Object}
     */
    static KEYS = {8: "BACKSPACE", 9: "TAB", 13: "ENTER", 27: "ESC"}

    /**
     * Attaches keys to class methods
     *
     * @param {Component} instance
     * @param {Object} keyMap key-value paired key and method map
     * @param {Node|string|null} selector
     */
    static register(instance, keyMap, selector = null) {

        let element = null;
        if (selector) {
            element = selector instanceof Node ? selector : new Node(selector);
        } else {
            element = instance.element;
        }

        element.nodeList.each(node => {
            element.events.add(node, "keydown", (element, event) => {
                for (let key in keyMap) {
                    if (this.handleKey(event) === key) {
                        event.preventDefault();
                        return instance.__proto__[keyMap[key]] ? instance.__proto__[keyMap[key]].call(instance, event) : false;
                    }
                }
            });
        });
    }

    static handleKey(event) {
        let keyCode = event.which || event.keyCode;
        let key = Keyboard.KEYS[keyCode] || "";

        key = event.shiftKey ? `SHIFT_${key}` : key;
        key = event.ctrlKey ? `CTRL_${key}` : key;
        key = event.altKey ? `ALT_${key}` : key;

        return key.replace(/_$/, "");
    }
}

export default Keyboard;
