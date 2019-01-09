import { IModel, Model, AttributeTypes } from '../../lib/model';
export interface IInstrumentModel extends IModel {
    name: string;
    type: string;
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
            required: boolean;
            type: AttributeTypes;
        };
    };
    load(): Promise<InstrumentModel>;
    save(): Promise<InstrumentModel>;
    create(data: IInstrumentModel): IInstrumentModel;
    delete(id: string): IInstrumentModel;
    get(id: string): IInstrumentModel;
    toArray(): IInstrumentModel[];
    update(id: string, data: IInstrumentModel): IInstrumentModel;
}
