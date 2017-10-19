import Component from '../components/Component';
import Element from '../components/dom/Element';

class Input extends Component {

    /**
     * Input constructor
     *
     * @param element
     */
    constructor(element) {
        super(element);

        this.checkForChanges();
    }

    /**
     * Fires when the element looses focus
     *
     */
    onBlur() {
        this.removeErrors();
    }

    /**
     * Fires when a key is released (while typing)
     */
    onKeyup() {
        this.applyValToElements();
    }

    /**
     * Fires when a key is pressed down
     */
    onKeydown() {
        this.applyValToElements();
    }

    /**
     *
     */
    applyValToElements() {
        let targets = new Element('[data-input-value="'+ this.element.attr('id') +'"]');
        if(this.element.val() === "") {
            targets.text(" ");
        }
        else {
            targets.text(this.element.val());
        }
    }

    /**
     * Removes the error indication, if that exists
     *
     * @return {void}
     */
    removeErrors() {
        if(this.element.val().length > 0 && this.element.parent().hasClass('has-error')) {
            this.element.parent().removeClass('has-error');
            this.element.next('.help-block').remove();
        }
    }

    checkForChanges() {

    }
}

export default Input;