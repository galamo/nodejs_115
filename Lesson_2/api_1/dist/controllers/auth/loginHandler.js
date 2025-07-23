"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const _1 = require(".");
function login(user) {
    var _a;
    const toLowerUserName = (_a = user.userName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const foundUser = _1.users.find(u => u.userName === toLowerUserName && u.password === user.password);
    return foundUser;
}
// this function will query DB
