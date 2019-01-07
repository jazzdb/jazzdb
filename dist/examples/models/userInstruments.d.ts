import { IModel, Model, ModelConfig } from '../../lib/model';
export interface IUserInstrumentModel extends IModel {
    instrumentId: string;
    userId: string;
}
export declare class UserInstrumentModel extends Model {
    filter(callbackfn: (value: IUserInstrumentModel, index: number, array: any[]) => any): IUserInstrumentModel[];
    find(callbackfn: (value: IUserInstrumentModel, index: number, obj: any[]) => any): IUserInstrumentModel;
    push(...items: IUserInstrumentModel[]): number;
    sort(compareFn?: (a: IUserInstrumentModel, b: IUserInstrumentModel) => number): any[];
}
declare class UserInstrumentModelConfig extends ModelConfig {
    init(): Promise<UserInstrumentModel>;
}
export declare const UserInstruments: UserInstrumentModelConfig;
export {};
