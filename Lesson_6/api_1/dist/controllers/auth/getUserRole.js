"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRole = getUserRole;
const db_1 = __importDefault(require("../../db"));
function getUserRole(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = [userId];
        const query = getUserRoleQuery();
        const result = yield ((yield (0, db_1.default)()).execute(query, params));
        console.log(result);
        return result[0] && result[0][0];
    });
}
const getUserRoleQuery = () => {
    return 'SELECT role FROM users_roles WHERE user_id = ?';
};
