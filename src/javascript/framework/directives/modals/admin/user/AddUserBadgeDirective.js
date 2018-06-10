import Directive from "../../../Directive";
import HTTPRequest from "../../../../../components/http/HTTPRequest";
import Notification from ".././../../../Notification";
import Node from "../../../../../components/dom/Node";

class AddUserBadgeDirective extends Directive {

    /**
     * @var {Node}
     */
    searchInput;

    start = 0;

    constructor(element) {
        super(element);

        function debounced(delay, fn) {
            let timerId;
            return function (...args) {
                if (timerId) {
                    clearTimeout(timerId);
                }
                timerId = setTimeout(() => {
                    fn(...args);
                    timerId = null;
                }, delay);
            }
        }

        let handler = debounced(250, this.findBadges.bind(this, true));

        this.searchInput = this.element.find("#new_badge_search");

        this.searchInput.on("input", handler);
        this.element.find(".loadmore").css({display: "none"}).on("click", this.findBadges.bind(this, false));
        this.element.on("click", ".add-badge", this.addBadge.bind(this));
    }

    findBadges(first = false) {
        if(first) {
            this.start = 0;
            this.element.find(".user-badges-list").clear();
        }

        if(this.searchInput.val().trim() !== "") {
            this.loadBadges(this.start).then(result => {
                for(let i in result) {
                    this.element
                        .find(".user-badges-list")
                        .append(`<li class='list-item user-badges-list-item perfect-row stretched' data-badge='${result[i].badge_id}'>` +
                            `<div class='badge-img push-right-8'><img src='${this.config.get("url")}/swf/c_images/album1584/${result[i].badge_id}.${result[i].imagetype}' /></div>` +
                            "<div class='devided badge-desc'>" +
                            `<span class="fw strong">${result[i].name}</span>` +
                            `${result[i].description}` +
                            "</div>" +
                            `${!result[i].owned ? "<button class='button button-green add-badge'>Geven</button>" : ""}`+
                            "</li>");
                }
            });
        }
        else {
            this.element.find(".user-badges-list").clear();
            this.element.find(".loadmore").css({display: "none"});
        }
    }

    loadBadges(start) {
        let value = btoa(this.searchInput.val());
        return new HTTPRequest({
            url: this.config.get("url") + `/resources/badges/search/${value}/${start}`,
            responseType: "json",
        }).then(result => {
            let count = result.count;
            delete result.count;
            this.start += Object.keys(result).length;
            if(this.start >= count) {
                this.element.find('.loadmore').css({display: "none"});
            }
            else {
                this.element.find('.loadmore').css({display: "block"});
            }
            return result;
        });
    }

    addBadge(element) {
        let value = btoa(element.parent().getData('badge'));

        new HTTPRequest({
            url: "badges/add",
            data: {
                "badgeid": value
            },
            headers: {
                "X-CSRF-TOKEN": this.config.csrf,
            },
            method: "post",
            responseType: "json"
        }).then(result => {
            if(result.error) {
                this.errorBag.clear().append(Notification.create("error", result.message));
            }
            else {
                this.addBadgeToView(result.badge);
                this.errorBag.clear().append(Notification.create("success", result.message));
                element.remove();
            }
        });
    }

    addBadgeToView(badge) {
        //amount of badges
        let badgeList = new Node(".user-badges-list-cut");
        let badgesLength = badgeList.find(".badge").length();
        let badgesRemaining = new Node("#seeAllBadges");


        if(badgesLength >= 33) {
            if(badgesRemaining.css("display") !== "none") {
                badgesRemaining.find(".badges-remaining").text("" + parseInt(badgesRemaining.find(".badges-remaining").text()) + 1);
            }
            else {
                badgesRemaining.css({display: "block"});
            }

            new Node(".user-badges-list")
                .append(`<li class='list-item user-badges-list-item perfect-row stretched' data-badge='${badge.badge_id}'>` +
                    `<div class='badge-img push-right-8'><img src='${this.config.get("url")}/swf/c_images/album1584/${badge.badge_id}.${badge.imagetype}' /></div>` +
                    "<div class='devided badge-desc'>" +
                    `<span class="fw strong">${badge.name}</span>` +
                    `${badge.description}` +
                    "</div></li>");
        }
        else {
            badgeList
                .append("<div class=\"badge\" style=\"width: 50px; height: 50px; display: flex; justify-content: center; align-items: center;\">"+
                        `<img src='${this.config.get("url")}/swf/c_images/album1584/${badge.badge_id}.${badge.imagetype}' />` +
                        "</div>");
        }
    }
}

export default AddUserBadgeDirective;