class Promise {
    constructor() {
        this.doneCallbacks = [];
        this.failCallbacks = [];
        this.alwaysCallbacks = [];
        this.thens = [];
        this.state = 'pending';
    }

    /**
     * Executes the callbacks in the given list
     *
     * @param {Array} list The list of callbacks to be called
     * @param {Array} args The arguments that need to be applied to the callbacks
     *
     * @return {void}
     */
    execute(list, args) {
        let i = list.length;

        //Convert the arguments to an array, so they can be used to
        // invoke the functions in the list
        args = Array.prototype.slice.call(args);

        while(i--) list[i].apply(null, args);
    }

    /**
     * Resolves the promise. Arguments applied will be send to the done() and always() callbacks
     *
     * @return {Promise}
     */
    resolve() {
        this.execute(this.doneCallbacks, arguments);
        this.execute(this.alwaysCallbacks, arguments);
        this.executeThens()

        this.state = 'resolved';
    }

    /**
     * Rejects the promis
     */
    reject() {
        this.execute(this.failCallbacks, arguments);
        this.execute(this.alwaysCallbacks, arguments);

        this.then.apply(null, Array.prototype.slice.call(arguments));

        this.state = 'rejected';
    }

    /**
     * The given callback gets called if the promise is resolved
     *
     * @param {Function} callback The callback to be called if the promise is resolved
     * @return {Promise}
     */
    done(callback) {
        this.doneCallbacks.push(callback);

        return this;
    }

    /**
     * The given callback gets called if the promise is rejected
     *
     * @param {Function} callback The callback to be called if the promise is rejected
     * @return {Promise}
     */
    fail(callback) {
        this.failCallbacks.push(callback);

        return this;
    }

    /**
     * The given callback always gets called, even when the promise is rejected
     *
     * @param {Function} callback
     */
    always(callback) {
        this.alwaysCallbacks.push(callback);

        return this;
    }

    /**
     *
     *
     * @param callback
     */
    then(callback) {
        this.then = callback;

        return this;
    }

    /**
     *
     * @return {Object}
     */
    promise() {
        return {
            done: this.done.bind(this),
            always: this.always.bind(this),
            fail: this.fail.bind(this),
            then: this.then.bind(this)
        }
    }
}

export default Promise;
