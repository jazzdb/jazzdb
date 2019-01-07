import { IModel, Model, ModelConfig, AttributeTypes } from '../../lib/model';

export interface IInstrumentModel extends IModel {
    name: string;
    type: string;
}

export class InstrumentModel extends Model {
    filter(callbackfn: (value: IInstrumentModel, index: number, array: any[]) => any): IInstrumentModel[] {
        return super.filter(callbackfn);
    }
    find(callbackfn: (value: IInstrumentModel, index: number, obj: any[]) => any): IInstrumentModel {
        return super.find(callbackfn);
    }
    push(...items: IInstrumentModel[]) {
        return super.push(...items);
    }
    sort(compareFn?: (a: IInstrumentModel, b: IInstrumentModel) => number) {
        return [...this.items].sort(compareFn);
    }
}

class InstrumentModelConfig extends ModelConfig {
    async init(): Promise<InstrumentModel> {
        return super.init();
    }
}

export const Instruments = new InstrumentModelConfig({
    table: 'instruments',
    attributes: {
        name: {
            required: true,
            unique: true,
            type: AttributeTypes.String
        },
        type: {
            required: true,
            type: AttributeTypes.String
        }
    }
});