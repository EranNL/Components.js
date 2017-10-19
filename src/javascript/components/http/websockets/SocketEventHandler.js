class SocketEventHandler {
    constructor(data, event) {
        this.data = data;
        this.event = event;

        this.handleEventAction(this.data.message);
    }

    handleEventAction(name) {
        
    }
}

export default SocketEventHandler;
