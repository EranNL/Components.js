

class Config {

    constructor() {
        this.c = this.getConfig();
    }

    getConfig() {
        if( !window.cjsConfig ) {
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

        if(typeof this.c[key] === "boolean") {
            return this.c[key];
        }

        return this.c[key] === "true" || this.c[key] === "1";
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
