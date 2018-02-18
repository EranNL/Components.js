
import Directive from "./Directive";

class SimpleEditorDirective extends Directive {
    constructor(element) {
        super(element);
    }

    init() {
        CKEDITOR.replace( this.element.attr('id'), {
            toolbar : 'Basic',
        });
    }
}

export default SimpleEditorDirective;