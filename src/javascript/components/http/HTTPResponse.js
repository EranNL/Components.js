class HTTPResponse {

    constructor(request) {
        this.request = request;
    }

    /**
     * Returns the readyState of the request
     * @return {Number}
     */
    readyState() {
        return this.request.readyState;
    }

    status() {
        return this.request.status;
    }

    response() {
        return this.request.response;
    }

    toJSON() {
        return JSON.parse(this.response());
    }

}

export default HTTPResponse;
