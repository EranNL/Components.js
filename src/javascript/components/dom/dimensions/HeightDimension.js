import Dimension from "./Dimension";

class HeightDimension extends Dimension {

    constructor(htmlElement) {
        super(htmlElement);

        this.height();
    }

    height() {
        if( this.htmlElement.isCollection() ) {
            this.htmlElement.each(element => {
                this.dimension += element.htmlElement.clientHeight;
            })
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
