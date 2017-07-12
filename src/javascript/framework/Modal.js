import Component from '../components/Component';
import Element from '../components/dom/Element';
import Keyboard from "../components/util/Keyboard";
import Stack from "../components/util/Stack";

class Modal extends Component {
    constructor(element) {
        super(element);

        this.id = Math.floor(Math.random() * 9999 + Date.now());

        this.$target = new Element('#' + this.element.getData('target'));
        this.$target.attr('data-modal-id', this.id);
        this.$target.find('[data-close]').on('click', this.onClose.bind(this));

        Keyboard.register(this, {
            'ESC': 'onAllClose'
        }, document);
    }

    onClick() {
        if(this.$target.css('display') === 'none') {
            if( this.element.getData('background') ) {
                this.addModalToStack();
                //Create a background element
                if( new Element('.modal-background').length() ) {
                    //no new background has to be made

                    new Element('.modal-background').get(0).before(this.$target);
                }
                else {
                    let background = Element.create('div');
                    background.addClass('modal-background').before(this.$target);
                }

                // this.checkForBackground();

                //Add an delegated event to the background to close the modal on click
                CJS(document).on('click', '.modal-background', this.onAllClose.bind(this));

                //Replace the variables within the modal with special ones
                // if(!!this.element.getData('modal-replace')) {
                //     this.populateData();
                // }
            }

            this.$target.css({display: 'block'}).addClass('open').trigger('modal.opened');
        }
    }

    /**
     * Called when the modal has to be closed
     *
     *
     * @callee [data-close]
     */
    onClose() {
        //sluit de huidige modal
        this.$target.removeClass('open').css({display: 'none'});
        //Als deze modal een background had:
        if( this.element.getData('background') ) {
            window.modals.remove();

            if( window.modals.size() ) {
                new Element('.modal-background').get(0).before(new Element('[data-modal-id="'+ window.modals.peek() +'"]').get(0));
            }
            else {
                new Element('.modal-background').remove();
                window.modals = null;
            }


        }
        //verwijder de laatste van de stack
        //kijk of de stack met modals nog een waarde heeft
        //zoja: verplaats de background voor de laatste
    }

    /**
     * Called when all all modals need to be closed
     *
     * @callee button:esc
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
     * @return void
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

    addModalToStack() {
        if( !window.modals ) {
            window.modals = new Stack();
        }


        window.modals.add(this.id);

    }
}

export default Modal;
