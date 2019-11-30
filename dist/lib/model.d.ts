export interface IAttribute {
    [name: string]: {
        required?: boolean;
        unique?: boolean;
        type?: 'boolean' | 'number' | 'string';
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
export declare class Model {
    attributes: IAttribute;
    protected defaultAttributes: IAttribute;
    items: any;
    length: number;
    name: string;
    path: string;
    constructor(opts?: IModelOpts);
    /**
     * load model
     */
    load(): Promise<any>;
    /**
     * save model
     */
    save(): Promise<any>;
    /**
     * create a record
     * @param data the record data
     */
    create(data: any): any;
    /**
     * create a record
     * @param data the record data
     */
    createMany(records: any[]): any[];
    /**
     * delete a record
     * @param id the record id
     */
    delete(id: string): any;
    /**
     * get a record
     * @param id the record id
     */
    get(id: string): any;
    /**
     * convert the records to an array
     */
    toArray(): any[];
    /**
     * truncate all records
     */
    truncate(): void;
    /**
     * update a record
     * @param id the record id
     * @param data the record data
     */
    update(id: string, data: any): any;
}
export declare enum AttributeTypes {
    Boolean = "boolean",
    Number = "number",
    String = "string"
}
