import { IModel, Model, AttributeTypes } from '../../lib/model';

export interface IInstrumentModel extends IModel {
    name: string;
    type: string;
}

export class InstrumentModel extends Model {
    name = 'instruments';
    attributes = {
        name: {
            required: true,
            unique: true,
            type: AttributeTypes.String
        },
        type: {
            required: true,
            type: AttributeTypes.String
        }
    };
    async load(): Promise<InstrumentModel> {
        return super.load();
    }
    async save(): Promise<InstrumentModel> {
        return super.save();
    }
    create(data: IInstrumentModel): IInstrumentModel {
        return super.create(data);
    }
    delete(id: string): IInstrumentModel {
        return super.delete(id);
    }
    get(id: string): IInstrumentModel {
        return super.get(id);
    }
    toArray(): IInstrumentModel[] {
        return super.toArray();
    }
    update(id: string, data: IInstrumentModel): IInstrumentModel {
        return super.update(id, data);
    }
}
