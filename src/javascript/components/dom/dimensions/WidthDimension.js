import Dimension from "./Dimension";

class WidthDimension extends Dimension {

    constructor(htmlElement) {
        super(htmlElement);

        this.width();
    }

    width() {
        if( this.htmlElement.length ) {
            for( let i = 0; i < this.htmlElement.length; i++ ) {
                this.dimension += this.htmlElement[i].clientWidth;
            }
        }
        else {
            this.dimension = this.htmlElement.clientWidth;
        }

        return this;
    }
}

export default WidthDimension;