import { IModel, Model, AttributeTypes } from '../../lib/model';
export interface IUserModel extends IModel {
    email?: string;
    password?: string;
    isActive?: boolean;
}
export declare class UserModel extends Model {
    name: string;
    attributes: {
        email: {
            required: boolean;
            unique: boolean;
            type: AttributeTypes;
        };
        password: {
            required: boolean;
            type: AttributeTypes;
        };
    };
    load(): Promise<UserModel>;
    save(): Promise<UserModel>;
    create(data: IUserModel): IUserModel;
    delete(id: string): IUserModel;
    get(id: string): IUserModel;
    toArray(): IUserModel[];
    update(id: string, data: IUserModel): IUserModel;
}
