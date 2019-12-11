import * as fs from 'fs-extra';
import * as path from 'path';
import * as uuid from 'uuid';

import { EnumJazzError, RequiredJazzError, TypeJazzError, UniqueJazzError } from '../errors';

export interface IAttribute {
  [name: string]: {
    enum?: any[];
    many?: boolean;
    required?: boolean;
    unique?: boolean;
    type?: AttributeTypes;
  };
}

export interface IModel {
  _id?: string;
  _createdAt?: number;
  _deletedAt?: number;
  _updatedAt?: number;
}

export interface IModelOpts {
  items?: any[];
  path?: string;
}

export class Model {
  attributes: IAttribute = {};
  protected defaultAttributes: IAttribute = {
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
  protected records: any[] = [];
  length = 0;
  name = '';
  path = path.normalize('./data');

  constructor(opts?: IModelOpts) {
    if (opts && opts.path !== undefined) {
      this.path = path.normalize(opts.path);
    }
    if (opts && opts.items !== undefined) {
      if (Array.isArray(opts.items)) {
        this.records = opts.items;
      } else {
        this.records = [];
        Object.entries(opts.items).forEach(([_id, item]: [string, any]) => {
          this.records.push({
            _id,
            ...item
          });
        });
      }
      this.length = this.records.length;
    }
  }

  /**
   * load model
   */
  async load(): Promise<any> {
    // load from single file
    const file = path.normalize(`${this.path}/${this.name}.json`);
    if (fs.existsSync(file)) {
      this.records = JSON.parse(await fs.readFile(file, 'utf8'));
      this.length = this.records.length;
      return this;
    }

    // load from dir of files
    const dir = path.normalize(`${this.path}/${this.name}`);

    // load files
    const files = (await fs.readdir(dir)).filter(item => item.match(/\.json$/i));

    // reset items
    this.records = [];

    for (let i = 0; i < files.length; i++) {
      const file = path.normalize(`${dir}/${files[i]}`);
      if (fs.existsSync(file)) {
        const item = JSON.parse(await fs.readFile(file, 'utf8'));
        this.records.push({
          _id: item._id,
          ...item
        });
      }
    }

    this.length = this.records.length;

    return this;
  }

  /**
   * save model
   */
  async save(): Promise<void> {
    if (!this.name) {
      throw new Error('Name is not configured.');
    }

    const file = path.normalize(`${this.path}/${this.name}.json`);
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      await fs.mkdirp(dir);
    }
    await fs.writeFile(file, JSON.stringify(this.records, null, 2));
  }

  /**
   * create one record
   * @param record one record
   */
  create(record: any): any {
    return this.createMany([record])[0];
  }

  /**
   * create many records
   * @param records many records
   */
  createMany(records: any[]): any[] {
    const attributes = {
      ...this.defaultAttributes,
      ...this.attributes
    };

    const indexes: any = {};
    Object.entries(attributes)
      .filter(([_, attribute]) => attribute.unique)
      .forEach(([attributeName]) => {
        indexes[attributeName] = {};
      });

    this.records.forEach((record) => {
      Object.keys(indexes).forEach((attributeName: string) => {
        indexes[attributeName][record[attributeName]] = record._id;
      });
    });

    const newRecords = records.map(newRecord => ({
      _id: uuid.v4(),
      _createdAt: new Date().getTime(),
      ...newRecord
    }));

    newRecords.forEach(newRecord => {
      Object.entries(attributes).forEach(([attributeName, attribute]) => {
        if (
          attribute.required &&
          (newRecord[attributeName] === undefined || newRecord[attributeName] === null)
        ) {
          throw new RequiredJazzError(`Attribute is required: ${attributeName}`);
        }
        if (attribute.many) {
          if (!Array.isArray(newRecord[attributeName])) {
            throw new TypeJazzError(`Attribute is invalid type: ${attributeName}`);
          }
          newRecord[attributeName].forEach((attributeValue: any) => {
            if (attribute.enum && !attribute.enum.includes(attributeValue)) {
              throw new EnumJazzError(`Attribute is invalid type: ${attributeName}`);
            }
            if (attributeValue && attribute.type !== typeof attributeValue) {
              throw new TypeJazzError(`Attribute is invalid type: ${attributeName}`);
            }
          });
        } else {
          if (attribute.enum && !attribute.enum.includes(newRecord[attributeName])) {
            throw new EnumJazzError(`Attribute is invalid enum: ${newRecord[attributeName]}`);
          }
          if (newRecord[attributeName] && attribute.type !== typeof newRecord[attributeName]) {
            throw new TypeJazzError(`Attribute is invalid type: ${attributeName}`);
          }
        }
      });

      Object.keys(indexes).forEach(attributeName => {
        const newValue = newRecord[attributeName];
        if (indexes[attributeName][newValue]) {
          const errorMessage = `Model (${this.name}) Attribute (${attributeName}) is not unique: ${newValue}`;
          throw new UniqueJazzError(errorMessage);
        }
        indexes[attributeName][newValue] = newRecord._id;
      });
    });

    this.records = this.records.concat(newRecords);
    this.length = this.records.length;

    return newRecords;
  }

  /**
   * delete many records
   * @param id one record id
   * @returns the deleted records
   */
  delete(id: string): any {
    return this.deleteMany([id])[0];
  }

  /**
   * delete many records
   * @param ids many record ids
   * @returns the deleted records
   */
  deleteMany(ids: string[]): any[] {
    const deletedItems = ids
      .map(id => {
        const deletedItemIndex = this.records.findIndex(({ _id }) => _id === id);
        if (deletedItemIndex !== -1) {
          return this.records.splice(deletedItemIndex, 1);
        }
      })
      .filter(deletedItem => deletedItem !== undefined);

    this.length = this.records.length;

    return deletedItems;
  }

  /**
   * get a record
   * @param id the record id
   */
  get(id: string) {
    return this.records.find(({ _id }) => _id === id);
  }

  /**
   * convert the records to an array
   */
  toArray() {
    return this.records.slice();
  }

  /**
   * truncate all records
   */
  truncate() {
    this.records = [];
    this.length = this.records.length;
  }

  /**
   * update a record
   * @param id the record id
   * @param data the record data
   */
  update(id: string, data: any) {
    const elementIndex = this.records.findIndex(({ _id }) => _id === id);

    if (elementIndex === -1) {
      return;
    }

    const updatedItem = {
      ...this.records[elementIndex],
      ...data
    };

    this.records.splice(elementIndex, 1, updatedItem);

    return updatedItem;
  }
}

export enum AttributeTypes {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string'
}
