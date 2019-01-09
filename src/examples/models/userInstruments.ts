import { IModel, Model, AttributeTypes } from '../../lib/model';

export interface IUserInstrumentModel extends IModel {
    instrumentId: string;
    userId: string;
}

export class UserInstrumentModel extends Model {
    name = 'userInstruments';
    attributes = {
        instrumentId: {
            required: true,
            unique: true,
            type: AttributeTypes.String
        },
        userId: {
            required: true,
            type: AttributeTypes.String
        }
    };
    async load(): Promise<UserInstrumentModel> {
        return super.load();
    }
    async save(): Promise<UserInstrumentModel> {
        return super.save();
    }
    create(data: IUserInstrumentModel): IUserInstrumentModel {
        return super.create(data);
    }
    delete(id: string): IUserInstrumentModel {
        return super.delete(id);
    }
    get(id: string): IUserInstrumentModel {
        return super.get(id);
    }
    toArray(): IUserInstrumentModel[] {
        return super.toArray();
    }
    update(id: string, data: IUserInstrumentModel): IUserInstrumentModel {
        return super.update(id, data);
    }
}
