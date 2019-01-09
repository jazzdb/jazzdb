export interface IModel {
    _id?: string;
    _createdAt?: number;
    _deletedAt?: number;
    _updatedAt?: number;
}
export declare class Model {
    attributes: any;
    protected defaultAttributes: any;
    items: any;
    length: number;
    name: string;
    /**
     * load model
     */
    load(): Promise<Model>;
    /**
     * save model
     */
    save(): Promise<Model>;
    /**
     * create a record
     * @param data the record data
     */
    create(data: any): any;
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
