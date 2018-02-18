import Directive from "../Directive";
import HTTPRequest from "../../../components/http/HTTPRequest";
import Element from "../../../components/dom/Element";

class LikeArticleDirective extends Directive {

    onClick() {
        let httpRequest = new HTTPRequest({
            url: this.config.get('url') + '/community/news/article/' + this.element.getData('article-id') + '/like',
            responseType: 'json',
            headers: {
                'X-CSRF-TOKEN': new Element('meta[name="csrf-token"]').attr('content')
            },
            method: 'POST'
        });

        httpRequest.then(response => {

            if(response.status === 'ok') {
                new Element('#likecount').text(response.message);
                this.element.remove()
            }
            else {
                if(this.config.get('environment') === 'development') console.log(response);
            }
        }).catch(response => {
            if(this.config.get('environment') === 'development') console.log(response);
        });
    }
}

export default LikeArticleDirective;