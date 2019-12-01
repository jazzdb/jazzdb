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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            var file, items_1, _a, _b, dir, items, i, file_1, item, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        file = path.normalize(this.path + "/" + this.name + ".json");
                        if (!fs.existsSync(file)) return [3 /*break*/, 2];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs.readFile(file, 'utf8')];
                    case 1:
                        items_1 = _b.apply(_a, [_e.sent()]);
                        items_1.forEach(function (item) {
                            _this.items[item._id] = item;
                        });
                        this.length = Object.keys(this.items).length;
                        return [2 /*return*/, this];
                    case 2:
                        dir = path.normalize(this.path + "/" + this.name);
                        if (!!fs.existsSync(dir)) return [3 /*break*/, 4];
                        return [4 /*yield*/, fs.mkdirp(dir)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4: return [4 /*yield*/, fs.readdir(dir)];
                    case 5:
                        items = (_e.sent()).filter(function (item) { return item.match(/\.json$/i); });
                        i = 0;
                        _e.label = 6;
                    case 6:
                        if (!(i < items.length)) return [3 /*break*/, 9];
                        file_1 = path.normalize(dir + "/" + items[i]);
                        if (!fs.existsSync(file_1)) return [3 /*break*/, 8];
                        _d = (_c = JSON).parse;
                        return [4 /*yield*/, fs.readFile(file_1, 'utf8')];
                    case 7:
                        item = _d.apply(_c, [_e.sent()]);
                        this.items[item._id] = item;
                        this.length = Object.keys(this.items).length;
                        _e.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * save model
     */
    Model.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.name) {
                            throw new Error('Name is not configured.');
                        }
                        file = path.normalize(this.path + "/" + this.name + ".json");
                        return [4 /*yield*/, fs.writeFile(file, JSON.stringify(this.toArray(), null, 2))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * create a record
     * @param data the record data
     */
    Model.prototype.create = function (data) {
        return this.createMany([data])[0];
    };
    /**
     * create a record
     * @param data the record data
     */
    Model.prototype.createMany = function (records) {
        var _this = this;
        records = records.map(function (data) { return (__assign({ _id: uuid.v4(), _createdAt: new Date().getTime() }, data)); });
        var attributes = __assign(__assign({}, this.defaultAttributes), this.attributes);
        var validate = validator({
            type: 'object',
            properties: attributes
        });
        var uniqueAttributes = Object.entries(attributes)
            .filter(function (_a) {
            var _ = _a[0], attribute = _a[1];
            return attribute.unique;
        })
            .map(function (_a) {
            var name = _a[0], attribute = _a[1];
            return (__assign(__assign({}, attribute), { name: name }));
        });
        records.forEach(function (data) {
            var isValid = validate(data);
            if (!isValid) {
                var errorMessage = "Model (" + _this.name + ") Attribute (" + validate.errors[0].field.replace(/^data\./, '') + ") " + validate.errors[0].message;
                throw new errors_1.InvalidJazzError(errorMessage);
            }
            if (uniqueAttributes.length) {
                uniqueAttributes.forEach(function (attribute) {
                    var newValue = data[attribute.name];
                    var item = _this.toArray().find(function (i) {
                        var existingValue = i[attribute.name];
                        if (existingValue !== undefined &&
                            newValue !== undefined &&
                            existingValue.toString().toLowerCase() === newValue.toString().toLowerCase()) {
                            return true;
                        }
                    });
                    if (attribute.unique && item) {
                        var errorMessage = "Model (" + _this.name + ") Attribute (" + attribute.name + ") is not unique: " + newValue;
                        throw new errors_1.UniqueJazzError(errorMessage);
                    }
                });
            }
            _this.items[data._id] = data;
            _this.length = Object.keys(_this.items).length;
        });
        return records;
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
     * truncate all records
     */
    Model.prototype.truncate = function () {
        this.items = {};
        this.length = 0;
    };
    /**
     * update a record
     * @param id the record id
     * @param data the record data
     */
    Model.prototype.update = function (id, data) {
        if (this.items[id]) {
            this.items[id] = __assign(__assign({}, this.items[id]), data);
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
