import Element from "../../../../../components/dom/Element";
import Directive from "../../../Directive";

class ViewUserBadgesDirective extends Directive {
    constructor(element) {
        super(element);
        this.initSearch();
    }

    initSearch() {
        let list = new Element('.user-badges-list');
        if(list.length()) {
            let badges = list.find('.user-badges-list-item');
            new Element('#badges_search').on('keyup', element => {
                if(element.val() === "") {
                    badges.css('display', 'flex');
                }
                else {
                    for(let i = 0; i < badges.length(); i++) {
                        if(new RegExp(element.val(), 'i').test(badges.get(i).text()) ||
                           new RegExp(element.val(), 'i').test(badges.get(i).getData('code'))) {
                            badges.css('display', 'flex');
                            continue;
                        }

                        badges.get(i).css('display', 'none');
                    }
                }
            })
        }
    }
}

export default ViewUserBadgesDirective;