import Component from "../../components/Component";

class FullEditorDirective extends Component {
    constructor(element) {
        super(element);
    }

    init() {
        CKEDITOR.replace( this.element.attr("id"), {
            toolbar : "Full",
        });
    }
}

export default FullEditorDirective;
