
import Directive from "../Directive";
import HTTPRequest from "../../../components/http/HTTPRequest";
import Element from "../../../components/dom/Element";

class StafflistDirective extends Directive {

    init() {
        this.element.find('.staff-list-item').each(element => {
            element.on('click', () => this.onStaffClick(element))
        })
    }

    onStaffClick(element) {
        let httprequest = new HTTPRequest({
            url: this.config.get('url') + '/community/staff/getmember/' + element.getData('staff-id'),
            method: 'GET',
        });

        httprequest.then(data => {
            data = data.toJSON();

            let container = new Element('#userinfo-container');

            if(container.find('.avatar').length() === 0) {
                container.find('.notification-container').remove();
                container.append('<img class="avatar"></img>' +
                    '<a href="#" class="user-username"><h5></h5></a>' +
                    '<em class="user-motto"></em>' +
                    '<div class="user-lastseen"></div>' +
                    '<div class="badges-container perfect-row" style="margin-left: 65px;"></div>' +
                    '<div class="devider hidden"></div>' +
                    '<span class="user-bio"></span>')
            }

            container.find('.avatar').attr('src', 'https://www.habbo.nl/habbo-imaging/avatarimage?hb=img&figure=' + data.look + '&action=std&gesture=sml&direction=2&size=m');
            container.find('.user-username').attr('href', this.config.get('url') + '/profile/' + data.username).find('h5').text(data.username)
            container.find('.user-motto').text(data.motto);
            container.find('.user-lastseen').text(data.lastseen);
            container.find('.badges-container').children().remove();


            if(data.badges.length > 0) {
                let bc = container.find('.badges-container');
                for(let i = 0; i < data.badges.length; i++) {
                    bc.append(`<img class="badge" src="${this.config.get('url')}/swf/c_images/album1584/${data.badges[i].badge_code}.${data.badges[i].badge.imagetype}" title="" />`)
                }
            }
            if(data.bio !== null) {
                    container.find('.user-bio').text(data.bio);
                    container.find('.devider').css({display: 'block'});
            }
            else {
                container.find('.devider').css({display: 'none'});
                container.find('.user-bio').text('');
            }
        }).catch(response => {
            console.log(response);
        })
    }
}

export default StafflistDirective;