"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var validator = require("is-my-json-valid");
var path = require("path");
var uuid = require("uuid");
var Model = /** @class */ (function () {
    function Model(props) {
        this.attributes = {};
        this.items = [];
        this.length = 0;
        this.table = '';
        this.attributes = props.attributes;
        this.table = props.table;
    }
    Model.prototype.every = function (callbackfn, thisArg) {
        return this.items.every(callbackfn);
    };
    Model.prototype.filter = function (callbackfn) {
        return this.items.filter(callbackfn);
    };
    Model.prototype.find = function (callbackfn) {
        return this.items.find(callbackfn);
    };
    Model.prototype.push = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var _a;
        var count = (_a = this.items).push.apply(_a, items.map(function (item) {
            var validate = validator({
                type: 'object',
                properties: _this.attributes
            });
            var isValid = validate(item);
            if (!isValid) {
                throw new Error(validate.errors.toString());
            }
            Object.keys(item).forEach(function (attribute) {
                var attributeOptions = _this.attributes[attribute];
                var value = item[attribute];
                if (attributeOptions.unique && _this.items.find(function (i) { return i[attribute] === value; })) {
                    throw new Error(attribute + " already exists: " + value);
                }
            });
            return __assign({ id: uuid.v4(), createdAt: new Date().getTime() }, item);
        }));
        this.length = this.items.length;
        return count;
    };
    Model.prototype.some = function (callbackfn, thisArg) {
        return this.items.some(callbackfn);
    };
    Model.prototype.sort = function (compareFn) {
        return this.items.slice().sort(compareFn);
    };
    /**
     * save an entity
     */
    Model.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dir, dirExists, id, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.table) {
                            throw new Error('Table is not configured.');
                        }
                        dir = path.normalize("./data");
                        dirExists = fs.existsSync(dir);
                        if (!!dirExists) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.mkdirp(dir)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        id = uuid.v4();
                        file = path.normalize(dir + "/" + this.table + ".json");
                        return [4 /*yield*/, fs.writeFile(file, JSON.stringify(this.items, null, 2))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                id: id
                            }];
                }
            });
        });
    };
    return Model;
}());
exports.Model = Model;
var AttributeTypes;
(function (AttributeTypes) {
    AttributeTypes["Boolean"] = "boolean";
    AttributeTypes["String"] = "string";
})(AttributeTypes = exports.AttributeTypes || (exports.AttributeTypes = {}));
var ModelConfig = /** @class */ (function () {
    /**
     * create an entity
     * @param props
     */
    function ModelConfig(props) {
        this.attributes = {};
        this.table = '';
        this.attributes = props.attributes;
        this.table = props.table;
    }
    ModelConfig.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dir, file, model, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        dir = path.normalize("./data");
                        if (!!fs.existsSync(dir)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.mkdirp(dir)];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        file = dir + "/" + this.table + ".json";
                        model = new Model({
                            attributes: this.attributes,
                            table: this.table
                        });
                        if (!!fs.existsSync(file)) return [3 /*break*/, 4];
                        return [4 /*yield*/, model.save()];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        _a = model;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fs.readFile(dir + "/" + this.table + ".json", 'utf8')];
                    case 5:
                        _a.items = _c.apply(_b, [_d.sent()]);
                        model.length = model.items.length;
                        _d.label = 6;
                    case 6: return [2 /*return*/, model];
                }
            });
        });
    };
    return ModelConfig;
}());
exports.ModelConfig = ModelConfig;
