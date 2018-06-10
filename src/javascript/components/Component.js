import Events from "./dom/Events";
import Config from "./Config";
import Str from "./util/Str";

class Component {

    /**
     * The node on which the Component wrapper is called
     * @type {Node}
     */
    element;

    /**
     * Config used to configure the framework
     * @type {Config}
     */
    config;

    /**
     * The events handler attached to this component.
     * @type {Events}
     */
    events;

    /**
     * Element in the component that shows the errors created
     * @type {Node}
     */
    errorBag;

    constructor(element) {
        this.element = element;
        this.config = new Config();
        this.events = new Events(this, this.element.nodeList);
        this.errorBag = this.element.find("[error-bag]");

        /**
         * Init method call. In this method, the component is made ready to serve.
         * Without this method, the constructor is needed for that purpose,
         * which is a bad practise.
         */
        if(this["init"]) {
            this["init"].call(this);
        }

        /**
         * Components can have special attributes who modify or extend the component
         * With these modifications, all components can be specifically constructed
         * to serve the best they can.
         */
        for (let attribute in this.element.getData()) {
            if (this[`apply${Str.ucFirst(attribute)}`]) this[`apply${Str.ucFirst(attribute)}`].call(this, [this.element.getData(attribute)]);
        }
    }
}

export default Component;
