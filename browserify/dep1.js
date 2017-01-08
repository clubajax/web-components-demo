
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