import { IModel, Model, AttributeTypes } from '../../lib/model';

export interface IUserModel extends IModel {
    email?: string;
    password?: string;
    isActive?: boolean;
}

export class UserModel extends Model {
    name = 'users';
    attributes = {
        email: {
            required: true,
            unique: true,
            type: AttributeTypes.String
        },
        password: {
            required: true,
            type: AttributeTypes.String
        }
    };
    async load(): Promise<UserModel> {
        return super.load();
    }
    async save(): Promise<UserModel> {
        return super.save();
    }
    create(data: IUserModel): IUserModel {
        return super.create(data);
    }
    delete(id: string): IUserModel {
        return super.delete(id);
    }
    get(id: string): IUserModel {
        return super.get(id);
    }
    toArray(): IUserModel[] {
        return super.toArray();
    }
    update(id: string, data: IUserModel): IUserModel {
        return super.update(id, data);
    }
}
