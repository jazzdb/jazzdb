import { IModel, Model, AttributeTypes } from '../../lib/model';

export interface IMusicianModel extends IModel {
  name?: string;
}

export class MusicianModel extends Model {
  name = 'musicians';
  attributes = {
    name: {
      required: true,
      unique: true,
      type: AttributeTypes.String
    }
  };
  async load(): Promise<MusicianModel> {
    return super.load();
  }
  async save(): Promise<void> {
    return super.save();
  }
  create(record: IMusicianModel): IMusicianModel {
    return super.create(record);
  }
  createMany(records: IMusicianModel[]): IMusicianModel[] {
    return super.createMany(records);
  }
  delete(id: string): IMusicianModel {
    return super.delete(id);
  }
  deleteMany(ids: string[]): IMusicianModel[] {
    return super.deleteMany(ids);
  }
  get(id: string): IMusicianModel {
    return super.get(id);
  }
  toArray(): IMusicianModel[] {
    return super.toArray();
  }
  update(id: string, data: IMusicianModel): IMusicianModel {
    return super.update(id, data);
  }
}
