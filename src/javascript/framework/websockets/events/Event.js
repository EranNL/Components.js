import Config from "../../../components/Config";

class Event {

    event = null;

    config;

    constructor(event) {
        this.event = event;
        this.config = new Config();
    }
}

export default Event;