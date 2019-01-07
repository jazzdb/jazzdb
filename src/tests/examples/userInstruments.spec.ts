import * as assert from 'assert';

import { InstrumentModel, Instruments } from '../../examples/models/instruments';
import { UserInstrumentModel, UserInstruments } from '../../examples/models/userInstruments';

describe('user instruments', () => {

    let instruments: InstrumentModel;
    let userInstruments: UserInstrumentModel;

    before(async () => {
        instruments = await Instruments.init();
        userInstruments = await UserInstruments.init();
    });

    it('should associate instrument with user', async () => {
        const currentLength = userInstruments.length;

        userInstruments.push({
            userId: '00bce127-1bd9-4908-b630-ba079583bab9',
            instrumentId: '8d961961-6323-48b3-b4b4-849daa1ac3ed'
        });

        assert.strictEqual(userInstruments.length, currentLength + 1);
    });

    it('should get user instruments', async () => {
        const myInstruments = userInstruments.filter(i => i.userId === '00bce127-1bd9-4908-b630-ba079583bab9')
            .map(ui => instruments.find(i => i._id === ui.instrumentId))
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