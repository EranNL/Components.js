import Directive from "../Directive";
import HTTPRequest from "../../../components/http/HTTPRequest";
import Element from "../../../components/dom/Node";

class CheckVoucherDirective extends Directive {
    constructor(element) {
        super(element);
    }

    init() {
        this.element.find('#check_voucher').on('click', () => this.onCheckVoucher());
    }

    onCheckVoucher() {
        new HTTPRequest({
            url: this.config.get('url') + '/shop/redeemvoucher/' + this.element.find('[name="voucher_code"]').get(0).val(),
            method: 'GET'
        })
        .done((data) => {
            data = data.toJSON();

            let container = new Element("#voucher-content");

            for(let part in data) {
                container.append('<div></div>');
            }
        })
    }
}
