import * as assert from 'assert';

import { InstrumentModel, Instruments } from '../../examples/models/instruments';

describe('instruments', () => {

    let instruments: InstrumentModel;

    before(async () => {
        instruments = await Instruments.init();
    });

    it('should create unique instrument', async () => {
        const currentLength = instruments.length;

        instruments.push({
            name: 'Trumpet',
            type: 'brass'
        });

        assert.strictEqual(instruments.length, currentLength + 1);
    });

    it('should fail to create duplicate instrument', async () => {
        try {
            instruments.push({
                name: 'Trombone',
                type: 'brass'
            });

            assert.fail('should throw error');

        } catch (error) {
            assert.strictEqual(error.message, 'name already exists: Trombone')
        }
    });

    it('should get a instrument', async () => {
        const instrument = instruments.find(i => i.name === 'Trumpet');

        assert.strictEqual(instrument.name, 'Trumpet');
    });

    it('should find instruments', async () => {
        const foundInstruments = instruments.filter(i => i.type === 'brass');

        assert.strictEqual(foundInstruments.length, 2);
    });

    it('should update instrument', async () => {
        const newInstrument = 'French Horn';

        const instrument = instruments.find(u => u.name === 'Trumpet');
        instrument.name = newInstrument;

        const updatedInstrument = instruments.find(i => i.name === newInstrument);

        assert.strictEqual(updatedInstrument.name, newInstrument);
    });

    it('should sort instruments', async () => {
        const sortedInstruments = instruments.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        assert.deepStrictEqual(
            sortedInstruments,
            [...instruments.items].sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            })
        );

        assert.notDeepStrictEqual(
            sortedInstruments,
            instruments.items
        );
    });

    it('should delete instrument', async () => {
        const currentLength = instruments.length;

        const instrumentIndex = instruments.findIndex(i => i.name === 'Trumpet');
        instruments.splice(instrumentIndex, 1);

        assert.strictEqual(instruments.length, currentLength - 1);
    });

    it('should map instruments from objects to strings', async () => {
        const mappedInstruments = instruments.map(i => i.name);

        assert.strictEqual(
            JSON.stringify(mappedInstruments),
            JSON.stringify(['Trombone', 'Clarinet'])
        );
    });

    it('should iterate over instruments', async () => {
        let counter = 0;
        
        instruments.forEach((instrument, index) => {
            counter += 1;

            if (index === 0) {
                assert.strictEqual(instrument.name, 'Trombone');
            } else if (index === 1) {
                assert.strictEqual(instrument.name, 'Clarinet');
            } else {
                assert.fail('should not have more than 2 records');
            }
        });

        assert.strictEqual(counter, 2);
    });

});