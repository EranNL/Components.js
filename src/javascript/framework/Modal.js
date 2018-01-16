import Component from '../components/Component';
import Element from '../components/dom/Element';
import Keyboard from "../components/util/Keyboard";
import Stack from "../components/util/Stack";

class Modal extends Component {
    constructor(element) {
        super(element);

        this.id = Math.floor(Math.random() * 9999 + Date.now());

        this.$target = new Element('#' + this.element.getData('target'));
        this.background = true;

        if(!this.$target.length()) {
            return;
        }

        this.$target.attr('data-modal-id', this.id);
        this.$target.find('[data-close]').on('click', this.onClose.bind(this));

    }

    /**
     * Sets the target modal
     *
     * @param {Element} target The target modal
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

    onClick() {
        if(this.$target.length() && this.$target.css('display') === 'none') {
            this.background = this.element.getData('background');
            this.openDialog();
        }
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
            let bg = new Element('.modal-background');
            if( bg.length() ) {
                //no new background has to be made

                bg.get(0).before(this.$target);
            }
            else {
                let background = Element.create('div');
                background.addClass('modal-background').before(this.$target);
            }


            //Add an delegated event to the background to close the modal on click
            new Element(document).on('click', '.modal-background', this.onAllClose.bind(this));

            // Replace the variables within the modal with special ones
            if(!!this.element.getData('modal-replace')) {
                this.populateData();
            }
        }

        this.$target.css({display: 'block'}).addClass('open').trigger('modal.opened');

        Keyboard.register(this, {
            'ESC': 'onAllClose'
        }, document);
    }

    /**
     * Called when the modal has to be closed
     *
     * @callee [data-close]
     */
    onClose() {
        //sluit de huidige modal
        this.$target.removeClass('open').css({display: 'none'});
        //Als deze modal een background had:
        if( this.background ) {
            window.modals.remove();

            if( window.modals.size() ) {
                new Element('.modal-background').get(0).before(new Element('[data-modal-id="'+ window.modals.peek() +'"]').get(0));
            }
            else {
                new Element('.modal-background').remove();
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
        this.$target.css({display: 'none'});

        //remove the background if it exists
        let background = new Element('.modal-background');

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
        let data = this.element.getData('modal-replace');

        for(let key in data) {
            this.$target.html(oldhtml => {
                return oldhtml.replace('{' + key + '}', data[key]);
            })
        }

        //reinit events, because the event handlers get removed on replacing the html
        //TODO make this not needed?
        this.$target.find('[data-close]').on('click', this.onClose.bind(this));
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
     * @param {Element|string} target The target modal
     * @param {boolean} background Whether the backgrouns should be shown
     */
    static open(target, background = true) {
        target = target instanceof Element ? target : new Element(target);

        if(!target.length()) return;

        let modal = new Modal(target);
        modal
            .setTarget(target)
            .setBackground(background)
            .openDialog();
    }
}

export default Modal;
