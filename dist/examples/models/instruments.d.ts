import { IModel, Model, ModelConfig } from '../../lib/model';
export interface IInstrumentModel extends IModel {
    name: string;
    type: string;
}
export declare class InstrumentModel extends Model {
    filter(callbackfn: (value: IInstrumentModel, index: number, array: any[]) => any): IInstrumentModel[];
    find(callbackfn: (value: IInstrumentModel, index: number, obj: any[]) => any): IInstrumentModel;
    findIndex(callbackfn: (value: IInstrumentModel, index: number, obj: any[]) => any): number;
    push(...items: IInstrumentModel[]): number;
    splice(start: number, deleteCount?: number): IInstrumentModel[];
    sort(compareFn?: (a: IInstrumentModel, b: IInstrumentModel) => number): any[];
}
declare class InstrumentModelConfig extends ModelConfig {
    init(): Promise<InstrumentModel>;
}
export declare const Instruments: InstrumentModelConfig;
export {};
