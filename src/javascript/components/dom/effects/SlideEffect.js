import Effect from "./Effect";

class SlideEffect extends Effect {
    constructor(type, duration, element, easing) {
        super(type, duration, element, easing);
    }

    left() {
        this.animate({width: '0px'});
    }

    right() {
        this.animate({width: '0px'})
    }

    up() {
        this.animate({height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0});
    }

    down() {}
}

export default SlideEffect;
