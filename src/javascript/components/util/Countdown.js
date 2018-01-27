import Element from "../dom/Element";
import Collection from "./Collection";

class Countdown {
    constructor(end, target = null) {
        this.end = end;
        this.target = target && target instanceof Element ? target : new Element(target);
        this.interval = null;
        this.timeleft = Date.parse(this.end) - Date.now();

        this.years = 0;
        this.months = 0;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;

        this.ye = this.target.find('.years');
        this.me = this.target.find('.months');
        this.de = this.target.find('.days');
        this.he = this.target.find('.hours')
        this.mine = this.target.find('.minutes');
        this.se = this.target.find('.seconds')

        this.donecallback = null;

        this.start();
    }

    /**
     * Starts the countdown
     *
     * @returns {Countdown}
     */
    start() {
        this.interval = setInterval(() => {
            if (this.timeleft > 0) {
                this.timeleft = Date.parse(this.end) - Date.now();

                this.update();
            }
            else {
                clearInterval(this.interval);
                typeof this.donecallback === 'function' ? this.donecallback.call(this) : null;
            }

        }, 1000);

        return this;
    }

    /**
     * Sets the callback to be called when the countdown is 0
     *
     * @param callback
     * @returns {Countdown}
     */
    done(callback) {
        this.donecallback = callback;

        return this;
    }

    /**
     * Updates the difference in time and calculates everything
     *
     * @return {void}
     */
    update() {
        this.seconds = Math.floor((this.timeleft / 1000) % 60);
        this.minutes = Math.floor((this.timeleft / 1000 / 60) % 60);
        this.hours = Math.floor((this.timeleft / (1000 * 60 * 60)) % 24);
        this.days = Math.floor(this.timeleft / (1000 * 60 * 60 * 24));

        if (this.target !== null) {
            this.se.text(this.seconds < 10 ? "0" + this.seconds : this.seconds);
            this.mine.text(this.minutes < 10 ? "0" + this.minutes : this.minutes);
            this.he.text(this.hours < 10 ? "0" + this.hours : this.hours);
            this.de.text(this.days);
        }
    }
}

export default Countdown;