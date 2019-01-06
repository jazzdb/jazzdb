export interface IModel {
    id?: string;
}
export declare class Model {
    attributes: any;
    items: any[];
    length: number;
    table: string;
    constructor(props: any);
    every(callbackfn: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean;
    filter(callbackfn: (value: any, index: number, array: any[]) => any): any[];
    find(callbackfn: (value: any, index: number, obj: any[]) => any): any;
    push(...items: any[]): number;
    some(callbackfn: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean;
    sort(compareFn?: (a: any, b: any) => number): any[];
    /**
     * save an entity
     */
    save(): Promise<any>;
}
interface IAttribute {
    required?: boolean;
    unique?: boolean;
    type: AttributeTypes;
}
export declare enum AttributeTypes {
    Boolean = "boolean",
    String = "string"
}
interface IModelConfigProps {
    attributes: {
        [key: string]: IAttribute;
    };
    table: string;
}
export declare class ModelConfig implements IModelConfigProps {
    attributes: {};
    table: string;
    /**
     * create an entity
     * @param props
     */
    constructor(props: IModelConfigProps);
    init(): Promise<Model>;
}
export {};
