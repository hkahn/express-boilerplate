"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const envs_1 = __importDefault(require("./envs"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.env = envs_1.default.env || 'development';
        this.port = envs_1.default.port || 8000;
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App (${this.env} environment)listening on port ${this.port}.`);
        });
    }
}
