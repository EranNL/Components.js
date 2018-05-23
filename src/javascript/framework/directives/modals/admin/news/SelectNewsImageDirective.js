import Node from "../../../../../components/dom/Node";
import Directive from "../../../Directive";

class SelectNewsImageDirective extends Directive {

    constructor(element) {
        super(element);

        this.initPromos();
    }

    initPromos() {
        this.element.find(".content").on("click", ".promo-preview-list-item img", element => {
            let chosen = new Node(".promo-preview-list-item img.chosen");
            if (chosen.length()) {
                chosen.removeClass("chosen");
                chosen.parent().find(".chosen-indicator").remove();
            }

            if (!element.hasClass("chosen")) {
                new Node("#news_promo").val(element.parent().attr("data-promo"));
                element.parent().append("<div class=\"chosen-indicator\"><i class=\"far fa-check fa-1x\"></i></div>");

                element.addClass("chosen");
            }
        });
    }
}

export default SelectNewsImageDirective;
