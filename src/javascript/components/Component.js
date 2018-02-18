import Events from './dom/Events';
import Config from "./Config";

class Component {

    constructor(element) {

        /**
         * The node on which the Component wrapper is called
         * @type {Element}
         */
        this.element = element;

        /**
         * Config used to configure the framework
         * @type {Config}
         */
        this.config = new Config();

        /**
         * The events handler attached to this component.
         * @type {Events}
         */
        this.events = new Events(this);

        if(this['init']) {
            this['init'].call(this);
        }
    }
}

export default Component;
