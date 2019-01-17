import * as fs from "fs-extra";
import * as validator from "is-my-json-valid";
import * as path from "path";
import * as uuid from "uuid";

export interface IModel {
  _id?: string;
  _createdAt?: number;
  _deletedAt?: number;
  _updatedAt?: number;
}

export interface IModelOpts {
  path?: string;
}

export class Model {
  attributes: any = {};
  protected defaultAttributes: any = {
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
  name = "";
  path = path.normalize('./data');

  constructor(opts?: IModelOpts) {
    if (opts && opts.path !== undefined) {
      this.path = path.normalize(opts.path);
    }
  }

  /**
   * load model
   */
  async load(): Promise<Model> {
    const dir = path.normalize(`${this.path}/${this.name}`);

    if (!fs.existsSync(dir)) {
      await fs.mkdirp(dir);
    }

    const items = (await fs.readdir(dir)).filter(item =>
      item.match(/\.json$/i)
    );

    for (let i = 0; i < items.length; i++) {
      const file = path.normalize(`${dir}/${items[i]}`);
      if (fs.existsSync(file)) {
        const item = JSON.parse(await fs.readFile(file, "utf8"));
        this.items[item._id] = item;
        this.length = Object.keys(this.items).length;
      }
    }

    return this;
  }

  /**
   * save model
   */
  async save(): Promise<Model> {
    if (!this.name) {
      throw new Error("Name is not configured.");
    }

    const dir = path.normalize(`${this.path}/${this.name}`);
    const dirExists = fs.existsSync(dir);
    if (!dirExists) {
      await fs.mkdirp(dir);
    }

    const currentItems = (await fs.readdir(dir))
      .filter(item => item.match(/\.json$/i))
      .map(item => item.replace(/\.json$/i, ""));
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
    data = {
      _id: uuid.v4(),
      _createdAt: new Date().getTime(),
      ...data
    };

    const attributes = {
      ...this.defaultAttributes,
      ...this.attributes
    };
    var validate = validator({
      type: "object",
      properties: attributes
    });
    const isValid = validate(data);

    if (!isValid) {
      const errorMessage = `"${validate.errors[0].field.replace(
        /^data\./,
        ""
      )}" ${validate.errors[0].message}`;
      throw new Error(errorMessage);
    }

    Object.keys(attributes).forEach(attributeName => {
      const attribute = attributes[attributeName];
      const newValue = data[attributeName];
      const item = this.toArray().find((i: any) => {
        const existingValue = i[attributeName];
        if (
          existingValue !== undefined &&
          newValue !== undefined &&
          existingValue.toString().toLowerCase() ===
            newValue.toString().toLowerCase()
        ) {
          return true;
        }
      });
      if (attribute.unique && item) {
        throw new Error(`${attributeName} already exists: ${newValue}`);
      }
    });

    this.items[data._id] = data;

    this.length = Object.keys(this.items).length;

    return data;
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
  Boolean = "boolean",
  Number = "number",
  String = "string"
}
