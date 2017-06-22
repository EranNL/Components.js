import Effect from "./Effect";

class FadeEffect extends Effect {

    constructor(type, duration, element, easing) {
        super(type, duration, element, easing);
    }

    out() {
        this.animate({opacity: 0});
    }

    in() {
        this.animate({opacity: 1});
    }
}


export default FadeEffect;
