"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const _1 = require(".");
function register(user) {
    var _a;
    const toLowerUserName = (_a = user.userName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const foundUser = _1.users.find(u => u.userName.toLowerCase() === toLowerUserName);
    if (foundUser) {
        return false;
    }
    else {
        _1.users.push(user);
        return true;
    }
}
