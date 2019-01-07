import * as fs from 'fs-extra';
import * as validator from 'is-my-json-valid';
import * as path from 'path';
import * as uuid from 'uuid';

export interface IModel {
    id?: string;
}

export class Model {
    attributes: any = {};
    items: any[] = [];
    length = 0;
    table: string = '';

    constructor(props: any) {
        this.attributes = props.attributes;
        this.table = props.table;
    }

    every(callbackfn: (value: any, index: number, array: any[]) => boolean, thisArg?: any) {
        return this.items.every(callbackfn);
    }
    
    filter(callbackfn: (value: any, index: number, array: any[]) => any) {
        return this.items.filter(callbackfn);
    }

    find(callbackfn: (value: any, index: number, obj: any[]) => any) {
        return this.items.find(callbackfn);
    }

    push(...items: any[]) {
        const count = this.items
            .push(
                ...items.map((item) => {
                    var validate = validator({
                        type: 'object',
                        properties: this.attributes
                    });
                    const isValid = validate(item);

                    if (!isValid) {
                        throw new Error(validate.errors.toString());
                    }

                    Object.keys(item).forEach((attribute) => {
                        const attributeOptions = this.attributes[attribute];
                        const value = item[attribute];
                        if (attributeOptions && attributeOptions.unique && this.items.find(i => i[attribute] === value)) {
                            throw new Error(`${attribute} already exists: ${value}`);
                        }
                    });
                    return {
                        id: uuid.v4(),
                        createdAt: new Date().getTime(),
                        ...item
                    };
                })
            );
        this.length = this.items.length;
        return count;
    }

    some(callbackfn: (value: any, index: number, array: any[]) => boolean, thisArg?: any) {
        return this.items.some(callbackfn);
    }

    sort(compareFn?: (a: any, b: any) => number) {
        return [...this.items].sort(compareFn);
    }

    /**
     * save an entity
     */
    async save(): Promise<any> {
        if (!this.table) {
            throw new Error('Table is not configured.');
        }

        const dir = path.normalize(`./data`);

        const dirExists = fs.existsSync(dir);
        if (!dirExists) {
            await fs.mkdirp(dir);
        }

        const id = uuid.v4();
        const file = path.normalize(`${dir}/${this.table}.json`);

        await fs.writeFile(file, JSON.stringify(this.items, null, 2));

        return {
            id
        };
    }
}

interface IAttribute {
    required?: boolean;
    unique?: boolean;
    type: AttributeTypes;
}

export enum AttributeTypes {
    Boolean = 'boolean',
    String = 'string'
}

interface IModelConfigProps {
    attributes: {
        [key: string]: IAttribute
    };
    table: string;
}

export class ModelConfig implements IModelConfigProps {
    attributes = {};
    table = '';

    /**
     * create an entity
     * @param props
     */
    constructor(props: IModelConfigProps) {
        this.attributes = props.attributes;
        this.table = props.table;
    }

    async init(): Promise<Model> {
        const dir = path.normalize(`./data`);

        if (!fs.existsSync(dir)) {
            await fs.mkdirp(dir);
        }

        const file = `${dir}/${this.table}.json`;

        const model = new Model({
            attributes: this.attributes,
            table: this.table
        });

        if (!fs.existsSync(file)) {
            await model.save();
        } else {
            model.items = JSON.parse(await fs.readFile(`${dir}/${this.table}.json`, 'utf8'));
            model.length = model.items.length;
        }

        return model;
    }
}