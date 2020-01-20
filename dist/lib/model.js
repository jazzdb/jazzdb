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
        this.indexes = {};
        this.records = [];
        this.length = 0;
        this.name = '';
        this.path = path.normalize('./data');
        if (opts && opts.path !== undefined) {
            this.path = path.normalize(opts.path);
        }
        if (opts && opts.items !== undefined) {
            if (Array.isArray(opts.items)) {
                this.records = opts.items;
            }
            else {
                this.records = [];
                Object.entries(opts.items).forEach(function (_a) {
                    var _id = _a[0], item = _a[1];
                    _this.records.push(__assign({ _id: _id }, item));
                });
            }
            this.index();
        }
    }
    /**
     * load model
     */
    Model.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, _b, _c, dir, files, i, file_1, item, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        file = path.normalize(this.path + "/" + this.name + ".json");
                        if (!fs.existsSync(file)) return [3 /*break*/, 2];
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fs.readFile(file, 'utf8')];
                    case 1:
                        _a.records = _c.apply(_b, [_f.sent()]);
                        this.index();
                        return [2 /*return*/, this];
                    case 2:
                        dir = path.normalize(this.path + "/" + this.name);
                        if (!fs.existsSync(dir)) {
                            return [2 /*return*/, this];
                        }
                        return [4 /*yield*/, fs.readdir(dir)];
                    case 3:
                        files = (_f.sent()).filter(function (item) { return item.match(/\.json$/i); });
                        // reset items
                        this.records = [];
                        i = 0;
                        _f.label = 4;
                    case 4:
                        if (!(i < files.length)) return [3 /*break*/, 7];
                        file_1 = path.normalize(dir + "/" + files[i]);
                        if (!fs.existsSync(file_1)) return [3 /*break*/, 6];
                        _e = (_d = JSON).parse;
                        return [4 /*yield*/, fs.readFile(file_1, 'utf8')];
                    case 5:
                        item = _e.apply(_d, [_f.sent()]);
                        this.records.push(__assign({ _id: item._id }, item));
                        _f.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        this.index();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * save model
     */
    Model.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, dir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.name) {
                            throw new Error('Name is not configured.');
                        }
                        file = path.normalize(this.path + "/" + this.name + ".json");
                        dir = path.dirname(file);
                        if (!!fs.existsSync(dir)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.mkdirp(dir)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, fs.writeFile(file, JSON.stringify(this.records, null, 2))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * create one record
     * @param record one record
     */
    Model.prototype.create = function (record) {
        return this.createMany([record])[0];
    };
    /**
     * create many records
     * @param records many records
     */
    Model.prototype.createMany = function (records) {
        var _this = this;
        var attributes = __assign(__assign({}, this.defaultAttributes), this.attributes);
        var newRecords = records.map(function (newRecord) { return (__assign({ _id: uuid.v4(), _createdAt: new Date().getTime() }, newRecord)); });
        newRecords.forEach(function (newRecord) {
            Object.entries(attributes).forEach(function (_a) {
                var attributeName = _a[0], attribute = _a[1];
                if (attribute.required &&
                    (newRecord[attributeName] === undefined || newRecord[attributeName] === null)) {
                    throw new errors_1.RequiredJazzError("Attribute is required: " + attributeName);
                }
                if (attribute.many) {
                    if (!Array.isArray(newRecord[attributeName])) {
                        throw new errors_1.TypeJazzError("Attribute is invalid type: " + attributeName);
                    }
                    newRecord[attributeName].forEach(function (attributeValue) {
                        if (attribute.enum && !attribute.enum.includes(attributeValue)) {
                            throw new errors_1.EnumJazzError("Attribute is invalid type: " + attributeName);
                        }
                        if (attributeValue && attribute.type !== typeof attributeValue) {
                            throw new errors_1.TypeJazzError("Attribute is invalid type: " + attributeName);
                        }
                    });
                }
                else {
                    if (attribute.enum && !attribute.enum.includes(newRecord[attributeName])) {
                        throw new errors_1.EnumJazzError("Attribute is invalid enum: " + newRecord[attributeName]);
                    }
                    if (newRecord[attributeName] && attribute.type !== typeof newRecord[attributeName]) {
                        throw new errors_1.TypeJazzError("Attribute is invalid type: " + attributeName);
                    }
                }
                if (attribute.unique) {
                    var newValue = newRecord[attributeName];
                    if (newValue !== undefined) {
                        if (_this.indexes[attributeName][newValue]) {
                            var errorMessage = "Model (" + _this.name + ") Attribute (" + attributeName + ") is not unique: " + newValue;
                            throw new errors_1.UniqueJazzError(errorMessage);
                        }
                        _this.indexes[attributeName][newValue] = newRecord._id;
                    }
                }
            });
        });
        this.records = this.records.concat(newRecords);
        this.index();
        return newRecords;
    };
    /**
     * delete many records
     * @param id one record id
     * @returns the deleted records
     */
    Model.prototype.delete = function (id) {
        return this.deleteMany([id])[0];
    };
    /**
     * delete many records
     * @param ids many record ids
     * @returns the deleted records
     */
    Model.prototype.deleteMany = function (ids) {
        var _this = this;
        var deletedItems = ids
            .map(function (id) {
            var deletedItemIndex = _this.records.findIndex(function (_a) {
                var _id = _a._id;
                return _id === id;
            });
            if (deletedItemIndex !== -1) {
                return _this.records.splice(deletedItemIndex, 1);
            }
        })
            .filter(function (deletedItem) { return deletedItem !== undefined; });
        this.index();
        return deletedItems;
    };
    /**
     * get a record
     * @param id the record id
     */
    Model.prototype.get = function (id) {
        return this.records.find(function (_a) {
            var _id = _a._id;
            return _id === id;
        });
    };
    Model.prototype.index = function () {
        var _this = this;
        var attributes = __assign(__assign({}, this.defaultAttributes), this.attributes);
        this.indexes = {};
        Object.entries(attributes)
            .filter(function (_a) {
            var _ = _a[0], attribute = _a[1];
            return attribute.unique;
        })
            .forEach(function (_a) {
            var attributeName = _a[0];
            _this.indexes[attributeName] = {};
        });
        this.records.forEach(function (record) {
            Object.keys(_this.indexes).forEach(function (attributeName) {
                if (record[attributeName] !== undefined) {
                    _this.indexes[attributeName][record[attributeName]] = record._id;
                }
            });
        });
        this.length = this.records.length;
    };
    /**
     * convert the records to an array
     */
    Model.prototype.toArray = function () {
        return this.records.slice();
    };
    /**
     * truncate all records
     */
    Model.prototype.truncate = function () {
        this.records = [];
        this.index();
    };
    /**
     * update a record
     * @param id the record id
     * @param data the record data
     */
    Model.prototype.update = function (id, data) {
        var elementIndex = this.records.findIndex(function (_a) {
            var _id = _a._id;
            return _id === id;
        });
        if (elementIndex === -1) {
            return;
        }
        var updatedItem = __assign(__assign({}, this.records[elementIndex]), data);
        this.records.splice(elementIndex, 1, updatedItem);
        return updatedItem;
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
