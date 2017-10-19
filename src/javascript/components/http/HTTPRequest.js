import Promise from "../util/Promise";
import HTTPResponse from "./HTTPResponse";
import HTTPRequestException from "./exceptions/HTTPRequestException";
import Str from "../util/Str";

class HTTPRequest {

    constructor(data) {
        this.data = data;

        let deferred = new Promise();
        let req = new XMLHttpRequest();

        req.open(this.data.method ? this.data.method.toUpperCase() : "GET", this.data.url ? this.data.url : "", this.data.async ? this.data.async : true);

        if(this.data.method && this.data.method.toUpperCase() === 'POST') {
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        //Set the headers
        if(this.data.headers) {
            for(let prop in this.data.headers) {
                req.setRequestHeader(prop, this.data.headers[prop]);
            }
        }

        if(this.data.responseType) {
            req.setRequestHeader('Content-Type', 'application/' + this.data.responseType.toLowerCase());
        }

        req.onload = () => {
            if(req.status === 200) {
                deferred.resolve(new HTTPResponse(req));
            }
            else {
                console.log(req.response);
                deferred.reject(new HTTPRequestException("Ajax request couldn't be made"));
            }
        };

        // if(this.data.method.toUpperCase() === 'POST') {
        //     req.send(Str.toURI(this.data.data));
        // }
        // else {
            //req.send();
        // }

        this.req = req;

        this.sendRequest();

        return deferred.promise();
    }

    onStateChange() {
        //
    }

    sendRequest() {
        if(this.data.method && this.data.method.toUpperCase() === "POST") {
            this.req.send(Str.toURI(this.data.data));
        }
        else {
            this.req.send();
        }
    }
}

export default HTTPRequest;
