import Component from "../components/Component";
import Node from "../components/dom/Node";
import Keyboard from "../components/util/Keyboard";
import Stack from "../components/util/Stack";

class Modal extends Component {

    /**
     * Unique id to identify this modal
     *
     * @type {number}
     */
    id = Math.floor(Math.random() * 9999 + Date.now());

    /**
     * The Node that opens this modal
     * @type {null}
     */
    invokers = null;

    /**
     * Determines whether the modal has a background
     *
     * @type {boolean}
     */
    background = true;

    constructor(element) {
        super(element);

        this.invokers = new Node(`[data-calls-component][data-target='${this.element.attr("id")}']`);
        this.invokers.on("click", this.openDialog.bind(this));

        this.element.attr("data-modal-id", this.id);

        this.element.find("[data-close]").on("click", this.onClose.bind(this));

        Keyboard.register(this, {
            "ESC": "onAllClose"
        }, document);
    }

    /**
     * Sets the target modal
     *
     * @param {Node} target The target modal
     * @returns {Modal}
     */
    setTarget(target) {
        this.$target = target;

        return this;
    }

    /**
     * Sets whether the background should be shown
     *
     * @param {boolean} allow Whether the background should be shown
     * @returns {Modal}
     */
    setBackground(allow) {
        this.background = allow;

        return this;
    }

    /**
     * Opens the dialog
     *
     * @return {void}
     */
    openDialog() {
        if( this.background ) {
            this.addModalToStack();
            //Create a background element
            let bg = new Node(".modal-background");
            if( bg.length() ) {
                //no new background has to be made

                bg.moveBefore(this.element);
            }
            else {
                let background = Node.create("div");
                background.addClass("modal-background").copyBefore(this.element);
            }


            //Add an delegated event to the background to close the modal on click
            new Node(document).on("click", ".modal-background", this.onAllClose.bind(this));

            // Replace the variables within the modal with special ones
            // if(this.element.getData("modal-replace")) {
            //     this.populateData();
            // }
        }

        this.element.css({display: "block"}).addClass("open");
    }

    /**
     * Called when the modal has to be closed
     *
     * @callee [data-close]
     */
    onClose() {
        //sluit de huidige modal
        this.element.removeClass("open").css({display: "none"});
        //Als deze modal een background had:
        if( this.background ) {
            window.modals.remove();

            if( window.modals.size() ) {
                new Node(".modal-background").moveBefore(new Node("[data-modal-id=\""+ window.modals.peek() +"\"]"));
            }
            else {
                new Node(".modal-background").remove();
                window.modals = null;
            }
        }
    }

    /**
     * Called when all all modals need to be closed
     *
     * @callee button|esc
     */
    onAllClose() {
        this.element.css({display: "none"});

        //remove the background if it exists
        let background = new Node(".modal-background");

        if( background.length() ) {
            background.remove();
            window.modals = null;
        }
    }

    /**
     * Replaces variables defined in the modal with dependant variables to a specific task
     *
     * @return {void}
     */
    populateData() {
        let data = this.invokers.getData("modal-replace");

        for(let key in data) {
            this.element.html(oldhtml => {
                return oldhtml.replace("{" + key + "}", data[key]);
            });
        }

        //reinit events, because the event handlers get removed on replacing the html
        //TODO make this not needed?
        this.element.find("[data-close]").on("click", this.onClose.bind(this));
    }

    /**
     * Adds the modal to the stack of modals, so it is known what the layer order
     * of the models is when closing them
     *
     * @return {void}
     */
    addModalToStack() {
        if( !window.modals ) {
            window.modals = new Stack();
        }


        window.modals.add(this.id);

    }

    /**
     * Opens the dialog without the need to click a button
     *
     * @param {Node|string} target The target modal
     * @param {boolean} background Whether the backgrouns should be shown
     */
    static open(target, background = true) {
        target = target instanceof Node ? target : new Node(target);

        if(!target.length()) return;

        let modal = new Modal(target);
        modal
            .setTarget(target)
            .setBackground(background)
            .openDialog();
    }
    applySearch() {

        let list = this.element.find("[searchable-list]");
        if(list.length()) {
            let items = list.find("[searchable-item]");
            let display = items.get(0).css("display");

            this.element.find("[search]").on("keyup", element => {
                if(element.val() === "") {
                    items.css({"display": display});
                }
                else {
                    for(let i = 0; i < items.length(); i++) {
                        let item = items.get(i);
                        if(new RegExp(element.val(), "i").test(item.text()) ||
                            new RegExp(element.val(), "i").test(item.getData("search-with"))) {
                            item.css("display", display);
                            continue;
                        }
                        item.css({"display": "none"});
                    }
                }
            });
        }
    }
}

export default Modal;
