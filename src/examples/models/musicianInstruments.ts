import { IModel, Model, AttributeTypes } from '../../lib/model';

export interface IMusicianInstrumentModel extends IModel {
  instrumentId: string;
  musicianId: string;
}

export class MusicianInstrumentModel extends Model {
  name = 'musicianInstruments';
  attributes = {
    instrumentId: {
      required: true,
      type: AttributeTypes.String
    },
    musicianId: {
      required: true,
      type: AttributeTypes.String
    }
  };
  async load(): Promise<MusicianInstrumentModel> {
    return super.load();
  }
  async save(): Promise<void> {
    return super.save();
  }
  create(record: IMusicianInstrumentModel): IMusicianInstrumentModel {
    return super.create(record);
  }
  createMany(records: IMusicianInstrumentModel[]): IMusicianInstrumentModel[] {
    return super.createMany(records);
  }
  delete(id: string): IMusicianInstrumentModel {
    return super.delete(id);
  }
  deleteMany(ids: string[]): IMusicianInstrumentModel[] {
    return super.deleteMany(ids);
  }
  get(id: string): IMusicianInstrumentModel {
    return super.get(id);
  }
  toArray(): IMusicianInstrumentModel[] {
    return super.toArray();
  }
  update(id: string, data: IMusicianInstrumentModel): IMusicianInstrumentModel {
    return super.update(id, data);
  }
}
