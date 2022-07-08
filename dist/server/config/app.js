"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const envs_1 = __importDefault(require("./envs"));
const controllers_1 = __importDefault(require("../controllers"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.env = envs_1.default.env || 'development';
        this.port = envs_1.default.port || 8000;
        this.initRoutes();
    }
    initRoutes() {
        const router = express_1.default.Router();
        controllers_1.default.forEach(controller => {
            router.use(controller.path, controller.router);
        });
        this.app.use('/v1', router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('\x1b[31m***************************************************\x1b[0m');
            console.log(`\x1b[32mApp listening on port \x1b[33m${this.port}\x1b[0m`);
            console.log(`\x1b[32mCurrent env: \x1b[33m${this.env} \x1b[0m`);
            console.log('\x1b[31m***************************************************\x1b[0m');
        });
    }
}
exports.default = App;
