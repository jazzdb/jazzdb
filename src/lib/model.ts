import * as fs from 'fs-extra';
import * as validator from 'is-my-json-valid';
import * as path from 'path';
import * as uuid from 'uuid';

import { InvalidJazzError, UniqueJazzError } from '../errors';

export interface IAttribute {
  [name: string]: {
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
  items: any = {};
  length = 0;
  name = '';
  path = path.normalize('./data');

  constructor(opts?: IModelOpts) {
    if (opts && opts.path !== undefined) {
      this.path = path.normalize(opts.path);
    }
    if (opts && opts.items !== undefined) {
      if (Array.isArray(opts.items)) {
        this.items = {};
        opts.items.forEach((item: any) => {
          this.items[item._id] = item;
        });
      } else {
        this.items = opts.items;
      }
    }
  }

  /**
   * load model
   */
  async load(): Promise<any> {
    const dir = path.normalize(`${this.path}/${this.name}`);

    if (!fs.existsSync(dir)) {
      await fs.mkdirp(dir);
    }

    const items = (await fs.readdir(dir)).filter(item => item.match(/\.json$/i));

    for (let i = 0; i < items.length; i++) {
      const file = path.normalize(`${dir}/${items[i]}`);
      if (fs.existsSync(file)) {
        const item = JSON.parse(await fs.readFile(file, 'utf8'));
        this.items[item._id] = item;
        this.length = Object.keys(this.items).length;
      }
    }

    return this;
  }

  /**
   * save model
   */
  async save(): Promise<any> {
    if (!this.name) {
      throw new Error('Name is not configured.');
    }

    const dir = path.normalize(`${this.path}/${this.name}`);
    const dirExists = fs.existsSync(dir);
    if (!dirExists) {
      await fs.mkdirp(dir);
    }

    const currentItems = (await fs.readdir(dir))
      .filter(item => item.match(/\.json$/i))
      .map(item => item.replace(/\.json$/i, ''));
    const items = this.toArray();

    for (let i = 0; i < items.length; i++) {
      const file = path.normalize(`${dir}/${items[i]._id}.json`);
      await fs.writeFile(file, JSON.stringify(items[i], null, 2));
    }

    for (let i = 0; i < currentItems.length; i++) {
      if (!items.find(item => item._id === currentItems[i])) {
        const file = path.normalize(`${dir}/${currentItems[i]}.json`);
        await fs.unlink(file);
      }
    }

    return this;
  }

  /**
   * create a record
   * @param data the record data
   */
  create(data: any) {
    return this.createMany([data])[0];
  }

  /**
   * create a record
   * @param data the record data
   */
  createMany(records: any[]) {
    records = records.map(data => ({
      _id: uuid.v4(),
      _createdAt: new Date().getTime(),
      ...data
    }));

    const attributes = {
      ...this.defaultAttributes,
      ...this.attributes
    };
    var validate = validator({
      type: 'object',
      properties: attributes
    } as any);

    const uniqueAttributes = Object.entries(attributes)
      .filter(([_, attribute]) => attribute.unique)
      .map(([name, attribute]) => ({
        ...attribute,
        name
      }));

    records.forEach(data => {
      const isValid = validate(data);

      if (!isValid) {
        const errorMessage = `Model (${this.name}) Attribute (${validate.errors[0].field.replace(
          /^data\./,
          ''
        )}) ${validate.errors[0].message}`;
        throw new InvalidJazzError(errorMessage);
      }

      if (uniqueAttributes.length) {
        uniqueAttributes.forEach(attribute => {
          const newValue = data[attribute.name];
          const item = this.toArray().find((i: any) => {
            const existingValue = i[attribute.name];
            if (
              existingValue !== undefined &&
              newValue !== undefined &&
              existingValue.toString().toLowerCase() === newValue.toString().toLowerCase()
            ) {
              return true;
            }
          });
          if (attribute.unique && item) {
            const errorMessage = `Model (${this.name}) Attribute (${attribute.name}) is not unique: ${newValue}`;
            throw new UniqueJazzError(errorMessage);
          }
        });
      }

      this.items[data._id] = data;

      this.length = Object.keys(this.items).length;
    })
    
    return records;
  }

  /**
   * delete a record
   * @param id the record id
   */
  delete(id: string) {
    const element = this.items[id];

    delete this.items[id];

    this.length = Object.keys(this.items).length;

    return element;
  }

  /**
   * get a record
   * @param id the record id
   */
  get(id: string) {
    return this.items[id];
  }

  /**
   * convert the records to an array
   */
  toArray() {
    const array: any[] = [];
    Object.keys(this.items).forEach(id => {
      array.push(this.items[id]);
    });
    return array;
  }

  /**
   * truncate all records
   */
  truncate() {
    this.items = {};
    this.length = 0;
  }

  /**
   * update a record
   * @param id the record id
   * @param data the record data
   */
  update(id: string, data: any) {
    if (this.items[id]) {
      this.items[id] = {
        ...this.items[id],
        ...data
      };
    } else {
      this.items[id] = data;
    }
    return this.items[id];
  }
}

export enum AttributeTypes {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string'
}
