import { IModel, Model, ModelConfig, AttributeTypes } from '../../lib/model';

export interface IUserModel extends IModel {
    email: string;
    password: string;
    isActive: boolean;
}

export class UserModel extends Model {
    filter(callbackfn: (value: IUserModel, index: number, array: any[]) => any): IUserModel[] {
        return super.filter(callbackfn);
    }
    find(callbackfn: (value: IUserModel, index: number, obj: any[]) => any): IUserModel {
        return super.find(callbackfn);
    }
    push(...items: IUserModel[]) {
        return super.push(...items);
    }
    sort(compareFn?: (a: IUserModel, b: IUserModel) => number) {
        return [...this.items].sort(compareFn);
    }
}

class UserModelConfig extends ModelConfig {
    async init(): Promise<UserModel> {
        return super.init();
    }
}

export const Users = new UserModelConfig({
    table: 'users',
    attributes: {
        email: {
            required: true,
            unique: true,
            type: AttributeTypes.String
        },
        password: {
            required: true,
            type: AttributeTypes.String
        }
    }
});