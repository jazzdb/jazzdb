interface ILoadDataOpts {
    path: string;
    models: ILoadDataOptsModel;
}
interface ILoadDataOptsModel {
    [index: string]: {};
}
export declare function loadData(opts: ILoadDataOpts): Promise<any>;
export {};
