import Element from "../../../../../components/dom/Element";
import Directive from "../../../Directive";

class ViewUserFriendsDirective extends Directive {
    constructor(element) {
        super(element);

        this.initSearch();
    }

    initSearch() {
        let list = new Element('.user-friend-list');
        if(list.length()) {
            new Element('#friend_search').on('keyup', element => {
                new Element('.user-friend-list-item').css('display', 'flex')
                if(element.val() === "") {
                    new Element('.user-friend-list-item').css('display', 'flex');
                }
                else {
                    new Element('.user-friend-list-item').not('[data-username*="' + element.val() + '"]').css({display: 'none'});
                }
            })
        }
    }
}

export default ViewUserFriendsDirective;