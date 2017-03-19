import Dimension from "./Dimension";

class HeightDimension extends Dimension {

    constructor(htmlElement) {
        super(htmlElement);

        this.height();
    }

    height() {
        if( this.htmlElement.length ) {
            for( let i = 0; i < this.htmlElement.length; i++ ) {
                this.dimension += this.htmlElement[i].clientHeight;
            }
        }
        else {
            this.dimension = this.htmlElement.clientHeight;
        }

        return this;
    }

    withPadding() {
        //@todo implementation
        return this;
    }

    withMargin() {
        //@todo implementation
        return this;
    }
}

export default HeightDimension;
