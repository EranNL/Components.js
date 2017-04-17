import Element from './../dom/Element';

class Keyboard {
    static register(instance, keyMap, selector) {
        //Check whether instance is a component

        let element = null;
        if ( selector ) {
            element = selector instanceof Element ? selector : new Element(selector);
        } else {
            element = instance.element;
        }
        console.log(element);

        element.events.add('keydown', (event) => {
            for( let key in keyMap ) {
                if( this.handleKey(event) === key ) {
                    return instance.__proto__[keyMap[key]] ? instance.__proto__[keyMap[key]].apply(instance, [instance.element, event]) : false;
                }
            }
        });
    }

    static handleKey(event) {
        let keyCode = event.which || event.keyCode;
        let key = Keyboard.KEYS[keyCode] || "";

        key = event.shiftKey ? `SHIFT_${key}` : key;
        key = event.ctrlKey ? `CTRL_${key}` : key;
        key = event.altKey ? `ALT_${key}` : key;

        return key.replace(/_$/, '');
    }
}

Keyboard.KEYS = {
    8: 'BACKSPACE',
    9: 'TAB',
    13: 'ENTER'
};

export default Keyboard;
