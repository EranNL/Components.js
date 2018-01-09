import Element from "./dom/Element";


class Config {

    constructor() {
        this.c = this.getConfig();

        this.csrf = new Element('meta[name="csrf-token"]').attr('content');
    }

    getConfig() {
        if (!window.cjsConfig) {
            window.cjsConfig = {};
        }

        return window.cjsConfig;
    }

    /**
     * Get an item from the config array
     *
     * @param {String} key
     * @return {*|null}
     */
    get(key) {
        return this.c[key] || null;
    }

    /**
     * Checks whether the key is either true of 1
     *
     * @param {String} key The key within the config
     * @return {boolean}
     */
    getBoolean(key) {

        if (typeof this.c[key] === "boolean") {
            return this.c[key];
        }

        return this.c[key] === "true" || this.c[key] === "1";
    }

    /**
     * Parses and returns the integer value of the requested key, while the
     * value is a valid integer
     *
     * @param string key
     * @returns {Integer}
     */
    getInteger(key) {
        return !isNaN(parseInt(this.c[key])) || parseInt(this.c[key]);
    }

    /**
     * Parses and returns the float value of the requested key, while the
     * value is a valid float
     *
     * @param string key
     * @returns {Integer}
     */
    getFloat(key) {
        return !isNaN(parseFloat(this.c[key])) || parseFloat(this.c[key]);
    }

    /**
     * Set an item in the config array
     * @param String key
     * @param {*} value
     * @return {Config}
     */
    set(key, value) {
        window.cjsConfig[key] = value;

        return this;
    }
}

export default Config;
