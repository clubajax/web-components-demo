'use strict';

let dep = require('./dep1');
let dom = require('dom');

class Base {
    constructor() {
        console.log('Base.constructor');
    }

    connectedCallback () {
        console.log('Base.connected', this.id);
    }
}

module.exports = Base;