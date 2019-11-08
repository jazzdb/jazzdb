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
var errors_1 = require("../errors");
var Model = /** @class */ (function () {
    function Model(opts) {
        var _this = this;
        this.attributes = {};
        this.defaultAttributes = {
            _id: {
                required: true,
                unique: true,
                type: AttributeTypes.String
            },
            _createdAt: {
                type: AttributeTypes.Number
            },
            _deletedAt: {
                type: AttributeTypes.Number
            },
            _updatedAt: {
                type: AttributeTypes.Number
            }
        };
        this.items = {};
        this.length = 0;
        this.name = '';
        this.path = path.normalize('./data');
        if (opts && opts.path !== undefined) {
            this.path = path.normalize(opts.path);
        }
        if (opts && opts.items !== undefined) {
            if (Array.isArray(opts.items)) {
                this.items = {};
                opts.items.forEach(function (item) {
                    _this.items[item._id] = item;
                });
            }
            else {
                this.items = opts.items;
            }
        }
    }
    /**
     * load model
     */
    Model.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dir, items, i, file, item, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        dir = path.normalize(this.path + "/" + this.name);
                        if (!!fs.existsSync(dir)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.mkdirp(dir)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2: return [4 /*yield*/, fs.readdir(dir)];
                    case 3:
                        items = (_c.sent()).filter(function (item) { return item.match(/\.json$/i); });
                        i = 0;
                        _c.label = 4;
                    case 4:
                        if (!(i < items.length)) return [3 /*break*/, 7];
                        file = path.normalize(dir + "/" + items[i]);
                        if (!fs.existsSync(file)) return [3 /*break*/, 6];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs.readFile(file, 'utf8')];
                    case 5:
                        item = _b.apply(_a, [_c.sent()]);
                        this.items[item._id] = item;
                        this.length = Object.keys(this.items).length;
                        _c.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * save model
     */
    Model.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dir, dirExists, currentItems, items, i, file, _loop_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.name) {
                            throw new Error('Name is not configured.');
                        }
                        dir = path.normalize(this.path + "/" + this.name);
                        dirExists = fs.existsSync(dir);
                        if (!!dirExists) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.mkdirp(dir)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, fs.readdir(dir)];
                    case 3:
                        currentItems = (_a.sent())
                            .filter(function (item) { return item.match(/\.json$/i); })
                            .map(function (item) { return item.replace(/\.json$/i, ''); });
                        items = this.toArray();
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < items.length)) return [3 /*break*/, 7];
                        file = path.normalize(dir + "/" + items[i]._id + ".json");
                        return [4 /*yield*/, fs.writeFile(file, JSON.stringify(items[i], null, 2))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        _loop_1 = function (i) {
                            var file;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!items.find(function (item) { return item._id === currentItems[i]; })) return [3 /*break*/, 2];
                                        file = path.normalize(dir + "/" + currentItems[i] + ".json");
                                        return [4 /*yield*/, fs.unlink(file)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 8;
                    case 8:
                        if (!(i < currentItems.length)) return [3 /*break*/, 11];
                        return [5 /*yield**/, _loop_1(i)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 8];
                    case 11: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * create a record
     * @param data the record data
     */
    Model.prototype.create = function (data) {
        var _this = this;
        data = __assign({ _id: uuid.v4(), _createdAt: new Date().getTime() }, data);
        var attributes = __assign({}, this.defaultAttributes, this.attributes);
        var validate = validator({
            type: 'object',
            properties: attributes
        });
        var isValid = validate(data);
        if (!isValid) {
            var errorMessage = "Model (" + this.name + ") Attribute (" + validate.errors[0].field.replace(/^data\./, '') + ") " + validate.errors[0].message;
            throw new errors_1.InvalidJazzError(errorMessage);
        }
        Object.keys(attributes).forEach(function (attributeName) {
            var attribute = attributes[attributeName];
            var newValue = data[attributeName];
            var item = _this.toArray().find(function (i) {
                var existingValue = i[attributeName];
                if (existingValue !== undefined &&
                    newValue !== undefined &&
                    existingValue.toString().toLowerCase() === newValue.toString().toLowerCase()) {
                    return true;
                }
            });
            if (attribute.unique && item) {
                var errorMessage = "Model (" + _this.name + ") Attribute (" + attributeName + ") is not unique: " + newValue;
                throw new errors_1.UniqueJazzError(errorMessage);
            }
        });
        this.items[data._id] = data;
        this.length = Object.keys(this.items).length;
        return data;
    };
    /**
     * delete a record
     * @param id the record id
     */
    Model.prototype.delete = function (id) {
        var element = this.items[id];
        delete this.items[id];
        this.length = Object.keys(this.items).length;
        return element;
    };
    /**
     * get a record
     * @param id the record id
     */
    Model.prototype.get = function (id) {
        return this.items[id];
    };
    /**
     * convert the records to an array
     */
    Model.prototype.toArray = function () {
        var _this = this;
        var array = [];
        Object.keys(this.items).forEach(function (id) {
            array.push(_this.items[id]);
        });
        return array;
    };
    /**
     * update a record
     * @param id the record id
     * @param data the record data
     */
    Model.prototype.update = function (id, data) {
        if (this.items[id]) {
            this.items[id] = __assign({}, this.items[id], data);
        }
        else {
            this.items[id] = data;
        }
        return this.items[id];
    };
    return Model;
}());
exports.Model = Model;
var AttributeTypes;
(function (AttributeTypes) {
    AttributeTypes["Boolean"] = "boolean";
    AttributeTypes["Number"] = "number";
    AttributeTypes["String"] = "string";
})(AttributeTypes = exports.AttributeTypes || (exports.AttributeTypes = {}));
