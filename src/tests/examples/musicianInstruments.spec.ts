import * as assert from 'assert';

import { InstrumentModel } from '../../examples/models/instruments';
import { MusicianInstrumentModel } from '../../examples/models/musicianInstruments';

interface IData {
  instruments?: InstrumentModel;
  musicianInstruments?: MusicianInstrumentModel;
}

describe('musician instruments', () => {
  const data: IData = {};

  beforeEach(async () => {
    data.instruments = await new InstrumentModel().load();
    data.musicianInstruments = await new MusicianInstrumentModel().load();
  });

  it('should associate instrument with musician', async () => {
    const currentLength = data.musicianInstruments.length;

    data.musicianInstruments.create({
      musicianId: '00bce127-1bd9-4908-b630-ba079583bab9',
      instrumentId: '8d961961-6323-48b3-b4b4-849daa1ac3ed'
    });

    assert.strictEqual(data.musicianInstruments.length, currentLength + 1);
  });

  it('should get musician instruments', async () => {
    data.musicianInstruments.create({
      musicianId: '00bce127-1bd9-4908-b630-ba079583bab9',
      instrumentId: 'eb90fd0d-281e-4677-bb72-c7a5f2954624'
    });

    const musicianInstruments = data.musicianInstruments
      .toArray()
      .filter(i => i.musicianId === '00bce127-1bd9-4908-b630-ba079583bab9')
      .map(ui => data.instruments.toArray().find(i => i._id === ui.instrumentId))
      .map(ui => {
        delete ui._createdAt;
        return ui;
      });

    assert.deepStrictEqual(musicianInstruments, [
      {
        _id: '8d961961-6323-48b3-b4b4-849daa1ac3ed',
        name: 'Trumpet',
        type: 'brass'
      },
      {
        _id: 'eb90fd0d-281e-4677-bb72-c7a5f2954624',
        name: 'Piano',
        type: 'percussion'
      }
    ]);
  });
});
