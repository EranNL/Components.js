import Component from "../components/Component";
import Node from "../components/dom/Node";

class Notification extends Component {
    constructor(element) {
        super(element);

        this.element.find('[data-close]').on('click', this.onClose.bind(this));
    }

    onClose() {
        this.element.remove();
    }

    static create(type, message) {
        let node = Node.create("div");
        node.addClass("notification").addClass(type);
        node.append(`<div class="message">${message}</div>`);
        node.append("<div class='close' data-close>&times;</div>");

        return new Notification(node);
    }
}

export default Notification;