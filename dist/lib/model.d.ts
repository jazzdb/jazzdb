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
export declare class Model {
    attributes: IAttribute;
    protected defaultAttributes: IAttribute;
    protected records: any[];
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
    save(): Promise<void>;
    /**
     * create one record
     * @param record one record
     */
    create(record: any): any;
    /**
     * create many records
     * @param records many records
     */
    createMany(records: any[]): any[];
    /**
     * delete many records
     * @param id one record id
     * @returns the deleted records
     */
    delete(id: string): any;
    /**
     * delete many records
     * @param ids many record ids
     * @returns the deleted records
     */
    deleteMany(ids: string[]): any[];
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
