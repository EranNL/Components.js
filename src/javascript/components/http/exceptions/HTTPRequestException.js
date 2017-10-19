import Exception from "../../exceptions/Exception";

class HTTPRequestException extends Exception {
    constructor(message) {
        super(message);
    }
}

export default HTTPRequestException;
