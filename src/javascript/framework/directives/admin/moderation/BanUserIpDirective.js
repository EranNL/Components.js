import Directive from "../../Directive";

class BanUserIpDirective extends Directive {

  init() {
    this.onIpBanChosen(this.element.find('.type'));
    this.element.find('.type').on('change', this.onIpBanChosen.bind(this));
  }

  onIpBanChosen(select) {

    if(select.val() === "ip") {
      this.element.find('.ip-select').css({display: 'block'});
    }
    else {
      this.element.find('.ip-select').css({display: 'none'});
    }
  }
}

export default BanUserIpDirective;