import Component from "../components/Component";

class Notification extends Component {
    constructor(element) {
        super(element);

        this.element.find('[data-close]').on('click', this.onClose.bind(this));
    }

    onClose() {
        this.element.remove();
    }
}

export default Notification;