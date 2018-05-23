import Directive from "../Directive";
import Keyboard from "../../../components/util/Keyboard";
import HTTPRequest from "../../../components/http/HTTPRequest";
import Element from "../../../components/dom/Node";
import Countdown from "../../../components/util/Countdown";

class AuctionDirective extends Directive {

    init() {
        this.bid = this.element.find('[name="bid"]');
        this.bidList = this.element.find('.bidding-overview').find('.bids');
        this.notificationContainer = this.element.find('.notification-container');

        this.countdown = null;

        //register the event handler for the bid input
        Keyboard.register(this, {
            'ENTER': 'onBid'
        }, this.bid);

        this.getCurrentAuction().then(() => {
            if(this.auction &&
                this.auction.lastbid &&
                this.auction.lastbid.user_id === this.config.getInteger("userId")) {
                this.bid.attr('disabled', true);
            }
            else {
                this.bid.attr('disabled', false);
            }

            this.startCountdown();
        });

        //force the bid list to be scrolled down
        this.bidList.scrollDown();

    }

    onBid() {
        let httprequest = new HTTPRequest({
            url: this.config.get('url') + '/shop/auction/bid',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': this.config.csrf
            },
            data: {
                bid: this.bid.val()
            }
        })

        httprequest.then(response => {
            let data = response.toJSON();

            if(data.error) {
                this.createNotification('error', data.message);
            }
            else {
                this.createNotification('success', data.message);
                this.bid.val('');
            }
        })
    }

    getCurrentAuction() {
        return new HTTPRequest({
            url: this.config.get('url') + '/shop/auction/get',
            responseType: 'json',
        }).then(response => {
            this.setCurrentAuction(response);
        });

    }

    setCurrentAuction(auction) {
        this.auction = auction;
    }

    createNotification(type, error = '') {
        this.element.find('.auction-notification').remove();

        let notif = Element.create('div');
        notif.addClass('auction-notification').addClass(type).text(error).appendTo(this.notificationContainer);

    }

    startCountdown() {
        this.countdown = new Countdown(this.auction.expires, this.element.find('.timeleft'));
        this.countdown.start().done(() => {

        })
    }
}

export default AuctionDirective;