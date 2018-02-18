import Component from "../components/Component";
import Config from "../components/Config";

class Datepicker extends Component {
    constructor(element) {
        super(element);
    }

    init() {
        const datepicker = require("flatpickr");
        const Lang = require("flatpickr/dist/l10n/"+ this.config.get('lang') +".js")[this.config.get('lang')];

        datepicker(this.element.htmlElement, {
            wrap: true,
            enableTime: this.element.getData('time') || false,
            altInput: true,
            dateFormat: this.element.getData('format') || "d-m-Y H:i",
            time_24hr: true,
            "locale": Lang
        });
    }
}

export default Datepicker;
