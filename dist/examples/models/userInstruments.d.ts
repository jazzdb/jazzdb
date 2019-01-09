import { IModel, Model, AttributeTypes } from '../../lib/model';
export interface IUserInstrumentModel extends IModel {
    instrumentId: string;
    userId: string;
}
export declare class UserInstrumentModel extends Model {
    name: string;
    attributes: {
        instrumentId: {
            required: boolean;
            unique: boolean;
            type: AttributeTypes;
        };
        userId: {
            required: boolean;
            type: AttributeTypes;
        };
    };
    load(): Promise<UserInstrumentModel>;
    save(): Promise<UserInstrumentModel>;
    create(data: IUserInstrumentModel): IUserInstrumentModel;
    delete(id: string): IUserInstrumentModel;
    get(id: string): IUserInstrumentModel;
    toArray(): IUserInstrumentModel[];
    update(id: string, data: IUserInstrumentModel): IUserInstrumentModel;
}
