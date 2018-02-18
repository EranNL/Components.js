import Component from "../components/Component";
import Countdown from "../components/util/Countdown";

class CountdownItem extends Component {

    constructor(element) {
        super(element);

        this.countdown = null;
    }

    init() {
        this.countdown = new Countdown(this.element.getData('expires'), this.element);
        this.countdown.start().done(() => {

        })

        console.log(this.countdown);
    }
}

export default CountdownItem;