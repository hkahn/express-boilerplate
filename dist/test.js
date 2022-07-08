"use strict";
var _aa_dd;
class aa {
    constructor() {
        _aa_dd.set(this, 3);
    }
}
_aa_dd = new WeakMap();
class bb extends aa {
    constructor() {
        super();
        console.log(this.dd);
    }
}
const kk = new bb();
console.log(kk);
