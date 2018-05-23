import Node from "../../../components/dom/Node";
import Event from "./Event";

class AuctionBidEvent extends Event {

    handle() {
        let bidlist = new Node(".bidding-overview .bids");

        bidlist
            .append(`<div class="bid"><strong>${this.event.data.username}</strong>: ${this.event.data.bid_value}<p class="time">${this.event.data.created_at}</p></div>`)
            .scrollDown();


        if(this.event.data.user_id === this.config.getInteger("userId")) {
            new Node("[name='bid']").attr("disabled", true);
        }
        else {
            new Node("[name='bid']").removeAttr("disabled");
        }
    }
}

export default AuctionBidEvent;