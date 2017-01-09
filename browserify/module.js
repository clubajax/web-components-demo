(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./dep1":2,"dom":"dom"}],2:[function(require,module,exports){

//
// dep1
//

'use strict';

let nested = require('./nested');

let dep1 = {
    id:'dep1'
};

console.log('dep exporting');
module.exports = dep1;
},{"./nested":3}],3:[function(require,module,exports){

//
// nested
//

'use strict';

let deep = require('./subs/deep');
let nested = {
    id:'nested'
};

module.exports = nested;
},{"./subs/deep":4}],4:[function(require,module,exports){
//
// deep
//

'use strict';

let deep = {
    id:'deep'
};
console.log('deeeep!');
module.exports = deep;
},{}]},{},[1]);
