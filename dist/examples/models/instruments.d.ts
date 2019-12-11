import { IModel, Model, AttributeTypes } from '../../lib/model';
export interface IInstrumentModel extends IModel {
    name: string;
    type: 'brass' | 'percussion';
}
export declare class InstrumentModel extends Model {
    name: string;
    attributes: {
        name: {
            required: boolean;
            unique: boolean;
            type: AttributeTypes;
        };
        type: {
            enum: string[];
            required: boolean;
            type: AttributeTypes;
        };
    };
    load(): Promise<InstrumentModel>;
    save(): Promise<void>;
    create(record: IInstrumentModel): IInstrumentModel;
    createMany(records: IInstrumentModel[]): IInstrumentModel[];
    delete(id: string): IInstrumentModel;
    deleteMany(ids: string[]): IInstrumentModel[];
    get(id: string): IInstrumentModel;
    toArray(): IInstrumentModel[];
    update(id: string, data: IInstrumentModel): IInstrumentModel;
}
