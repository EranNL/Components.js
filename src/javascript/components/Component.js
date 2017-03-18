/**
 *
 */

import Events from './dom/Events';

class Component {

    constructor(element) {
        this.element = element;

        this.events = new Events(this);
    }
}

export default Component;
