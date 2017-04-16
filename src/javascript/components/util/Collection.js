
class Collection {

    constructor(array) {
        if(typeof array === 'object') {
            this.array = array;
        }
        else {
            this.array = [];

            for(let i = 0; i < arguments.length; i++){
                this.array.push(arguments[i]);
            }
        }
    }

    /**
     * Gets the first index a value is located on in the collection
     *
     * @param {String} value The value that is looked for
     *
     * @return {int}
     */
    getFirstIndex(value) {
        let index = -1;

        for(let i = 0; i < this.array.length; i++) {
            if(this.array[i] === value) {
                index = i;
                break;
            }
        }

        return index;
    }

    /**
     * Executes a callback for each element in the collection
     * @param callback
     */
    each(callback) {
        for(let i = 0; i < this.length(); i++) {
            callback(this.array[i], i);
        }
    }

    /**
     * Gets the last index a value is located on in the collection
     *
     * @param {String} value The value that is looked for
     *
     * @return {int}
     */
    getLastIndex(value) {
        let index = -1;

        for(let i = 0; i < this.array.length; i++) {
            if(this.array[i] === value) {
                index = i;
            }
        }

        return index;
    }

    /**
     * Returns the index(es) on which a given value is located in a collection.
     *
     * @param {String} value The value that is looked for
     *
     * @return {Object}
     */
    getIndexes(value) {
        let indexes = new Collection();

        for(let i = 0; i < this.array.length; i++) {
            if(this.array[i] === value) {
                indexes.push(i);
            }
        }

        return indexes;
    }

    /**
     * Filter the array with a given expression. The array only contains the values that match the filter.
     *
     * @param {callback} condition The condition callback. The rule whith wich every value has to be checked
     *
     * @return {Object}
     */
    filter(condition) {
        let filteredArray = new Collection();

        for(let i = 0; i < this.array.length; i++) {
            if(condition(this.array[i])) {
                filteredArray.push(this.array[i]);
            }
        }

        return filteredArray;
    }

    /**
     * Returns the amount of elements in the collection
     * @returns {Number}
     */
    length() {
        return this.array.length;
    }

    /**
     * Push an item to the collection
     *
     * @param {*} value The value to be pushed
     *
     * @return {this}
     */
    push(value) {
        this.array.push(value);

        return this;
    }

    /**
     * Returns the element on a specific index
     * @param {int} index The index of the element
     * @return {*}
     */
    get(index) {
        return this.array[index];
    }

    /**
     * Returns the plain array of the collection
     *
     * @return {array}
     */
    toArray() {
        return this.array;
    }
}

export default Collection;
