/**
 * A stack is a collection that holds on to the order that the values are inserted.
 * Only the last inserted value can be fetches first. After the first is fetches, the second can be fetches, etc.
 *
 * @author Eran Machiels
 */

class Stack {
    /**
     * Class constructor
     *
     * @param array
     */
    constructor(array) {
        if(typeof array === 'object') {
            this.array = array;
        }
        else {
            this.array = [];

            for(let i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
        }
    }

    /**
     * Adds a value to the top of the set
     * @param value
     */
    add(value) {
        this.array.push(value);
    }

    /**
     * Returns the top value of the stack and deletes it, or null if the array is empty
     *
     * @return {*}
     */
    pop() {
        if( this.array.length === 0 ) {
            return null;
        }

        return this.array.pop();
    }

    /**
     * Returns the top value of the stack, or null if the array is empty
     *
     * @return {*}
     */
    peek() {
        if( this.array.length === 0) {
            return null;
        }

        return this.array[this.array.length - 1];
    }

    /**
     * Returns the size of the stack
     *
     * @return {Number}
     */
    size() {
        return this.array.length;
    }

    /**
     * Removes the top of the stack
     *
     * @return {void}
     */
    remove() {
        this.array.splice(this.array.length - 1, 1);
    }
}

export default Stack;
