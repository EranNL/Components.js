import Element from "../../dom/Element";
import SocketEventHandler from "./SocketEventHandler";

class Websocketserver {

    constructor() {
        if( !window.websocket ) {
            window.websocket = io.connect("http://127.0.0.1:8890");
        }

        this.handleMessages();
        this.loadEvents();
    }

    handleMessages() {
        window.websocket.on("message", (data) => {
            data = JSON.parse(data);

            if( data.type === "private" && data.token ) {
                if( data.token !== new Element("meta[name='ws-token']").attr("content") ) {
                    return;
                }
            }
            new SocketEventHandler(data);
        });
    }

    loadEvents() {

    }
}

export default Websocketserver;
