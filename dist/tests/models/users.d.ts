import { IModel, Model, ModelConfig } from '../../lib/model';
export interface IUserModel extends IModel {
    email: string;
    password: string;
}
export declare class UserModel extends Model {
    filter(callbackfn: (value: IUserModel, index: number, array: any[]) => any): IUserModel[];
    find(callbackfn: (value: IUserModel, index: number, obj: any[]) => any): IUserModel;
    push(...items: IUserModel[]): number;
    sort(compareFn?: (a: IUserModel, b: IUserModel) => number): any[];
}
declare class UserModelConfig extends ModelConfig {
    init(): Promise<UserModel>;
}
export declare const Users: UserModelConfig;
export {};
