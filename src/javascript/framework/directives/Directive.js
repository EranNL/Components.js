import Component from "../../components/Component";

class Directive extends Component {

    constructor(element) {
        super(element);

        this.handleEvents();
    }

    handleEvents() {
        this.element.on('*', (element, event) => {
        });
    }
}

export default Directive;
