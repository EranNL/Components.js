import HTTPResponse from "./HTTPResponse";
import HTTPRequestException from "./exceptions/HTTPRequestException";
import Str from "../util/Str";

class HTTPRequest {

    constructor(data) {
        this.data = data;

        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.open(this.data.method ? this.data.method.toUpperCase() : "GET", this.data.url ? this.data.url : "", this.data.async ? this.data.async : true);

            if (this.data.method && this.data.method.toUpperCase() === 'POST') {
                req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }

            //Set the headers
            if (this.data.headers) {
                for (let prop in this.data.headers) {
                    req.setRequestHeader(prop, this.data.headers[prop]);
                }
            }

            if (this.data.responseType) {
                req.responseType = this.data.responseType.toLowerCase();
            }

            if (!this.data.crossDomain) {
                req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }

            req.onload = () => {
                if (req.status === 200) {
                    if(this.data.responseType) {
                        resolve(req.response);
                    }
                    else {
                        resolve(new HTTPResponse(req));
                    }
                }
                else {
                    reject(new HTTPResponse(req));
                }
            };

            this.req = req;

            this.sendRequest();
        });
    }

    onStateChange() {
        //
    }

    sendRequest() {
        if (this.data.method && this.data.method.toUpperCase() === "POST") {
            this.req.send(Str.toURI(this.data.data));
        }
        else {
            this.req.send();
        }
    }
}

export default HTTPRequest;
