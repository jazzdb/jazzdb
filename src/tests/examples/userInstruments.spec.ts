import * as assert from 'assert';

import { InstrumentModel } from '../../examples/models/instruments';
import { UserInstrumentModel } from '../../examples/models/userInstruments';

interface IData {
    instruments?: InstrumentModel;
    userInstruments?: UserInstrumentModel;
}

describe('user instruments', () => {

    const data: IData = {};

    before(async () => {
        data.instruments = await new InstrumentModel().load();
        data.userInstruments = await new UserInstrumentModel().load();
    });

    it('should associate instrument with user', async () => {
        const currentLength = data.userInstruments.length;

        data.userInstruments.create({
            userId: '00bce127-1bd9-4908-b630-ba079583bab9',
            instrumentId: '8d961961-6323-48b3-b4b4-849daa1ac3ed'
        });

        assert.strictEqual(data.userInstruments.length, currentLength + 1);
    });

    it('should get user instruments', async () => {
        const myInstruments = data.userInstruments.toArray().filter(i => i.userId === '00bce127-1bd9-4908-b630-ba079583bab9')
            .map(ui => data.instruments.toArray().find(i => i._id === ui.instrumentId))
            .map(ui => {
                delete ui._createdAt;
                return ui;
            });

        assert.deepStrictEqual(
            myInstruments,
            [
                {
                    _id: 'eb90fd0d-281e-4677-bb72-c7a5f2954624',
                    name: 'Clarinet',
                    type: 'woodwind'
                },
                {
                    _id: '8d961961-6323-48b3-b4b4-849daa1ac3ed',
                    name: 'Trombone',
                    type: 'brass'
                }
            ]
        );
    });

});