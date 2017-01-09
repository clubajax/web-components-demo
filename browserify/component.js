'use strict';

console.log('require dep...');
let dep = require('./dep1');
let dom = require('dom');
console.log('dep not dupe:', dep);
let component = {
    id:'c'
};
console.log('component -----> ', component);


module.exports = component;