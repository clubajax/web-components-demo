'use strict';

console.log('require dep...');
let dep = require('dep1');
console.log('dep:', dep);
let component = {
    id:'c'
};
console.log('component', component);


module.exports = component;