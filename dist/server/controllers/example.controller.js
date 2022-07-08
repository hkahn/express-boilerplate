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
const controller_1 = __importDefault(require("./controller"));
const example_service_1 = __importDefault(require("../services/example.service"));
class ExamplesController extends controller_1.default {
    constructor() {
        super();
        this.path = '/examples';
        this.exampleService = new example_service_1.default();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', (req, res, next) => this.index(req, res, next));
        this.router.post('/', (req, res, next) => this.store(req, res, next));
        this.router.get('/:_id', this.show);
        this.router.patch('/:_id', this.update);
        this.router.delete('/:_id', this.destroy);
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.exampleService.index();
                return res.json({ adsf: 'adsf' });
            }
            catch (e) {
                return next(e);
            }
        });
    }
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exampleData = req.body;
                console.log(exampleData);
                const response = yield this.exampleService.store(exampleData);
                return res.status(201).json(response);
            }
            catch (e) {
                console.log(e);
                return next(e);
            }
        });
    }
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({ adsf: 'adsf' });
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({ adsf: 'adsf' });
        });
    }
    destroy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({ adsf: 'adsf' });
        });
    }
}
exports.default = ExamplesController;
