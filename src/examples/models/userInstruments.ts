import { IModel, Model, ModelConfig, AttributeTypes } from '../../lib/model';

export interface IUserInstrumentModel extends IModel {
    instrumentId: string;
    userId: string;
}

export class UserInstrumentModel extends Model {
    filter(callbackfn: (value: IUserInstrumentModel, index: number, array: any[]) => any): IUserInstrumentModel[] {
        return super.filter(callbackfn);
    }
    find(callbackfn: (value: IUserInstrumentModel, index: number, obj: any[]) => any): IUserInstrumentModel {
        return super.find(callbackfn);
    }
    push(...items: IUserInstrumentModel[]) {
        return super.push(...items);
    }
    sort(compareFn?: (a: IUserInstrumentModel, b: IUserInstrumentModel) => number) {
        return [...this.items].sort(compareFn);
    }
}

class UserInstrumentModelConfig extends ModelConfig {
    async init(): Promise<UserInstrumentModel> {
        return super.init();
    }
}

export const UserInstruments = new UserInstrumentModelConfig({
    table: 'userInstruments',
    attributes: {
        instrumentId: {
            required: true,
            unique: true,
            type: AttributeTypes.String
        },
        userId: {
            required: true,
            type: AttributeTypes.String
        }
    }
});