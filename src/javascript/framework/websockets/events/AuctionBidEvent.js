import Element from '../../../components/dom/Element';
import Config from "../../../components/Config";

class AuctionBidEvent {

    constructor(event) {
        this.event = event;
        this.config = new Config();
    }

    handle() {
        console.log(this.event);
        let bidlist = new Element('.bidding-overview .bids');

        bidlist
            .append(`<div class="bid"><strong>${this.event.data.username}</strong>: ${this.event.data.bid_value}<p class="time">${this.event.data.created_at}</p></div>`)
            .scrollDown();


        if(this.event.data.user_id === this.config.getInteger("userId")) {
            new Element('[name="bid"]').attr('disabled', true);
        }
        else {
            new Element('[name="bid"]').removeAttr('disabled');
        }
    }
}

export default AuctionBidEvent;