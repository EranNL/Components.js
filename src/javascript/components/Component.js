import Events from "./dom/Events";
import Config from "./Config";
import Str from "./util/Str";

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
