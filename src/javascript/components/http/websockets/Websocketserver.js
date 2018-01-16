import Element from "../../dom/Element";
import SocketEventHandler from "./SocketEventHandler";
import Echo from "laravel-echo";
import channels from './channels';
import Str from '../../util/Str';
import Config from "../../Config";

class Websocketserver {

    constructor() {
        this.config = new Config;

        //@todo Check why auth endpoint is called twice
        if (!window.websocket) {
            window.websocket = new Echo({
                broadcaster: 'pusher',
                key: 'a1207f83d18dbb3080b0',
                cluster: 'eu',
                encrypted: false,
            });
        }
        /**
         * List with events and their listener classes
         * @type {Array}
         */
        this.events = {};

        this.handleMessages();
    }

    /**
     * Handle all incoming events. Events that exist are called
     *
     * @return {void}
     */
    handleMessages() {
        for (let channel in channels) {
            let eventhandler = channel.indexOf('private-') !== -1 ?
                window.websocket.private(channel.substr("private-".length, channel.length - 1) + '.' + this.config.get('userId')) :
                window.websocket.channel(channel);

            let events = channels[channel];

            for (let i = 0; i < events.length; i++) {
                let event = events[i].event;
                try {
                    if (!this.events[event]) {
                        this.events[event] = require('./../../../framework/websockets/events/' + Str.ucFirst(event) + 'Event.js').default;
                    }

                    eventhandler.listen(event, (e) => {
                        (new this.events[event](e)).handle();
                    })
                }
                catch (e) {
                }
            }
        }
    }

    /**
     * Returns the list of available events
     * @return {Array}
     */
    static getEvents() {
        return this.events;
    }
}

export default Websocketserver;
