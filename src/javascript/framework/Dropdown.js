import Component from "../components/Component";
import Node from "../components/dom/Node";

class Dropdown extends Component {

    /**
     * The Node that opens this modal
     * @type {null}
     */
    invokers = null;

    /**
     * Whether this dropdown instance is open
     * @type {boolean}
     */
    isOpen = false;

    /**
     * The to be openend dropdown menu
     * @type {Node}
     */
    dropdownMenu = null;

    constructor(element) {
        super(element);

        this.invoker = this.element.find(".dropdown-link");
        this.dropdownMenu = this.element.find(".dropdown-menu");
        this.invoker.on("click", this.onOpen.bind(this));

        new Node(document).on("click", Dropdown.onCloseAll.bind(this));
    }

    onClick(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    onOpen() {
        if(this.element.hasClass("open")) {
            this.onClose();
        }
        else {
            Dropdown.onCloseAll();
            this.element.addClass("open");
            this.dropdownMenu.css({display: "block"});
        }
    }

    onClose() {
        this.element.removeClass("open");
        this.dropdownMenu.css({display: "none"});
    }

    static onCloseAll() {
        let openedDropdown = new Node(document).find(".dropdown.open");
        openedDropdown
            .removeClass("open")
            .find(".dropdown-menu")
            .css({display: "none"});
    }
}

export default Dropdown;