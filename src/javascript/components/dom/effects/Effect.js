class Effect {

    constructor(type = null, duration, element, easing) {
        this.duration = duration;
        this.element = element;
        this.easing = easing;
        this.isRunning = false;
        this.animationFrame = null;
        this.hasFinished = false;
        this.cssDiff = {};

        if (type && this[type]) {
            this[type].call(this);
        }
    }

    /**
     * Stop the current running effect
     *
     * @returns {Effect}
     */
    stop() {
        cancelAnimationFrame(this.animationFrame);
        this.isRunning = false;

        return this;
    }

    /**
     * Returns whether the effect is finished
     *
     * @returns {boolean}
     */
    isFinished() {
        return this.hasFinished;
    }

    /**
     * Returns whether the effect is running
     *
     * @return {Effect.isRunning}
     */
    isRunning() {
        return this.isRunning;
    }

    /**
     * Animate css things
     *
     * @param {Object}
     */
    animate(css) {
        return new Promise((resolve, reject) => {
            if (typeof css === "object") {
                for (let property in css) {
                    this.cssDiff[property] = this.calculateDifference(property, css[property]);
                }
            }
            else if (arguments.length === 2) {
                this.cssDiff[arguments[0]] = this.calculateDifference(arguments[0], arguments[1]);
            }
            else {
                return;
            }

            let start = performance.now();

            this.animationFrame = requestAnimationFrame(function animate(time) {
                this.isRunning = true;
                let timeFraction = (time - start) / this.duration;

                if (timeFraction > 1) timeFraction = 1;

                let timing = this.timer(timeFraction);

                this.draw(timing);

                if (timing < 1) {
                    requestAnimationFrame(animate.bind(this));
                }
                else {
                    resolve(true);
                }
            }.bind(this));
        });
    }

    /**
     * Draws the animation to the element
     *
     * @param timing The percentage of the to be animated CSS that has to be applied
     */
    draw(timing) {
        for (let property in this.cssDiff) {
            this.element.style[property] = this.cssDiff[property].start + (timing * this.cssDiff[property].value) + this.cssDiff[property].unit;
        }
    }

    /**
     * Times the animation, so different types of easing are possible
     *
     * @param timeFraction The fraction of the time the animation takes
     * @return {number}
     */
    timer(timeFraction) {
        switch (this.easing) {
        case "ease-in":
            return timeFraction * timeFraction;
        case "ease-out":
            return timeFraction * (2 - timeFraction);
        case "circ":
            return 1 - Math.sin(Math.acos(timeFraction));
        case "bounce":
            for (let a = 0, b = 1; 1; a += b, b /= 2) {
                if (timeFraction >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
                }
            }
        default:
            return timeFraction;
        }
    }

    /**
     * Calculates the difference between the to be animated CSS and the existing CSS, to
     * determine what difference has to be animated
     *
     * @param property The CSS property to be animated
     * @param cssValue The value of the to be animated CSS property
     * @return {{value: number, unit: number, start: number}}
     */
    calculateDifference(property, cssValue) {
        let existingCSS = window.getComputedStyle(this.element)[property];
        let match = /(\d+)(px|em|%|rem)/.exec(existingCSS);
        let differenceMap = {value: 0, unit: 0, start: 0};

        if (match !== null) {
            differenceMap.start = Number(existingCSS.replace(/px|em|%|rem/g, ""));
            differenceMap.value = Number(typeof cssValue === "string" ? cssValue.replace(/px|em|%|rem/g, "") : cssValue) - Number(match[1]);
            differenceMap.unit = match[2];
        }
        else {
            differenceMap.start = Number(existingCSS);
            differenceMap.value = (typeof cssValue === "string" ? Number(cssValue.replace(/px|em|%|rem/g, "")) : cssValue) - Number(existingCSS);
        }

        return differenceMap;
    }
}

export default Effect;