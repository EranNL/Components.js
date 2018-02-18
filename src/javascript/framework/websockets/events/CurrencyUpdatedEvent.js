class CurrencyUpdatedEvent {

    constructor(event) {
        this.event = event;
    }

    handle() {
      console.log(this.event);
    }
}

export default CurrencyUpdatedEvent;