import { IModel, Model, ModelConfig, AttributeTypes } from '../../lib/model';

export interface IInstrumentModel extends IModel {
    name: string;
    type: string;
}

export class InstrumentModel extends Model {
    filter(callbackfn: (value: IInstrumentModel, index: number, array: IInstrumentModel[]) => any): IInstrumentModel[] {
        return super.filter(callbackfn);
    }
    find(callbackfn: (value: IInstrumentModel, index: number, obj: IInstrumentModel[]) => any): IInstrumentModel {
        return super.find(callbackfn);
    }
    findIndex(callbackfn: (value: IInstrumentModel, index: number, obj: IInstrumentModel[]) => any): number {
        return super.findIndex(callbackfn);
    }
    forEach(callbackfn: (value: IInstrumentModel, index: number, array: IInstrumentModel[]) => void): void {
        return this.items.forEach(callbackfn);
    }
    map(callbackfn: (value: IInstrumentModel, index: number, array: IInstrumentModel[]) => any): IInstrumentModel[] {
        return this.items.map(callbackfn);
    }
    push(...items: IInstrumentModel[]) {
        return super.push(...items);
    }
    splice(start: number, deleteCount?: number): IInstrumentModel[] {
        return super.splice(start, deleteCount);
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