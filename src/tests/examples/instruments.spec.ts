import * as assert from 'assert';

import { InstrumentModel } from '../../examples/models/instruments';

interface IData {
    instruments?: InstrumentModel
}

describe('instruments', () => {

    const data: IData = {};

    before(async () => {
        data.instruments = await new InstrumentModel().load();
    });

    it('should create unique instrument', async () => {
        const currentLength = data.instruments.length;

        data.instruments.create({
            name: 'Trumpet',
            type: 'brass'
        });

        assert.strictEqual(data.instruments.length, currentLength + 1);
    });

    it('should fail to create duplicate instrument', async () => {
        try {
            data.instruments.create({
                name: 'Trombone',
                type: 'brass'
            });

            assert.fail('should throw error');

        } catch (error) {
            assert.strictEqual(error.message, 'name already exists: Trombone')
        }
    });

    it('should get instrument', async () => {
        const instrument = data.instruments.get('8d961961-6323-48b3-b4b4-849daa1ac3ed');

        assert.deepStrictEqual(
            instrument,
            {
                _id: '8d961961-6323-48b3-b4b4-849daa1ac3ed',
                name: 'Trombone',
                type: 'brass'
            }
        );
    });

    it('should convert instruments to array', async () => {
        const instrumentsArray = data.instruments.toArray();

        assert.strictEqual(instrumentsArray.length, 3);
    });
    
    it('should delete instrument', async () => {
        const currentLength = data.instruments.length;

        data.instruments.delete('8d961961-6323-48b3-b4b4-849daa1ac3ed');

        assert.strictEqual(data.instruments.length, currentLength - 1);
    });

});