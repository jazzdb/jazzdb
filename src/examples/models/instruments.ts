import { IModel, Model, AttributeTypes } from '../../lib/model';

export interface IInstrumentModel extends IModel {
  name: string;
  type: 'brass' | 'percussion';
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
      enum: ['brass', 'percussion'],
      required: true,
      type: AttributeTypes.String
    }
  };
  async load(): Promise<InstrumentModel> {
    return super.load();
  }
  async save(): Promise<void> {
    return super.save();
  }
  create(record: IInstrumentModel): IInstrumentModel {
    return super.create(record);
  }
  createMany(records: IInstrumentModel[]): IInstrumentModel[] {
    return super.createMany(records);
  }
  delete(id: string): IInstrumentModel {
    return super.delete(id);
  }
  deleteMany(ids: string[]): IInstrumentModel[] {
    return super.deleteMany(ids);
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
