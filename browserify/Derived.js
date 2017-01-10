'use strict';
let Base = require('./Base');

class Derived extends Base {
    constructor() {
        super();
        console.log('Derived.constructor');
    }

    connectedCallback () {
        console.log('Derived.connected!', this.id);
    }
}

module.exports = Derived;