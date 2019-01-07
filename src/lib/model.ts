import * as fs from 'fs-extra';
import * as validator from 'is-my-json-valid';
import * as path from 'path';
import * as uuid from 'uuid';

export interface IModel {
    _id?: string;
    _createdAt?: string;
    _deletedAt?: string;
    _updatedAt?: string;
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
                        const errorMessage = `"${validate.errors[0].field.replace(/^data\./, '')}" ${validate.errors[0].message}`
                        throw new Error(errorMessage);
                    }

                    Object.keys(item).forEach((attribute) => {
                        const attributeOptions = this.attributes[attribute];
                        const value = item[attribute];
                        if (attributeOptions && attributeOptions.unique && this.items.find(i => i[attribute] === value)) {
                            throw new Error(`${attribute} already exists: ${value}`);
                        }
                    });
                    return {
                        _id: uuid.v4(),
                        _createdAt: new Date().getTime(),
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

        for (let i = 0; i < this.items.length; i++) {
            const dir = path.normalize(`./data/${this.table}`);
            const dirExists = fs.existsSync(dir);
            if (!dirExists) {
                await fs.mkdirp(dir);
            }
            
            const file = path.normalize(`${dir}/${this.items[i]._id}.json`);
            await fs.writeFile(file, JSON.stringify(this.items[i], null, 2));
        }

        return {};
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
        const model = new Model({
            attributes: this.attributes,
            items: [],
            table: this.table
        });

        const dir = path.normalize(`./data/${this.table}`);

        if (!fs.existsSync(dir)) {
            await fs.mkdirp(dir);
        }

        const items = await fs.readdir(dir);

        for (let i = 0; i < items.length; i++) {
            const file = path.normalize(`${dir}/${items[i]}`);
            if (fs.existsSync(file)) {
                model.items.push(
                    JSON.parse(await fs.readFile(file, 'utf8'))
                );
                model.length = model.items.length;
            }
        }

        return model;
    }
}