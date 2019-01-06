declare class DataObject {
    records: any[];
    push(object: any): void;
}
export declare function data(data: any): Promise<DataObject>;
export {};
