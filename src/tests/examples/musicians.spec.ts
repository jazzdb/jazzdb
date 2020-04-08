import * as assert from 'assert';

import { UniqueJazzError } from '../../errors';
import { MusicianModel } from '../../examples/models/musicians';

interface IData {
  musicians?: MusicianModel;
}

describe('musicians', () => {
  const data: IData = {};

  beforeEach(async () => {
    data.musicians = await new MusicianModel().load();
  });

  it('should create unique musician', () => {
    const currentLength = data.musicians.length;

    data.musicians.create({
      name: 'Duke Ellington'
    });

    assert.strictEqual(data.musicians.length, currentLength + 1);
  });

  it('should fail to create duplicate musician', () => {
    data.musicians.create({
      name: 'Duke Ellington'
    });

    try {
      data.musicians.create({
        name: 'Duke Ellington'
      });

      assert.fail('should throw error');
    } catch (error) {
      assert.ok(error instanceof UniqueJazzError);
    }
  });

  it('should get a musician', () => {
    const musician = data.musicians.toArray().find(u => u.name === 'Louis Armstrong');

    assert.strictEqual(musician.name, 'Louis Armstrong');
  });

  it('should find musicians', () => {
    data.musicians.create({
      name: 'Duke Ellington'
    });

    const foundMusicians = data.musicians.toArray().filter(u => u.name.length > 0);

    assert.strictEqual(foundMusicians.length, 2);
  });

  it('should update musician', () => {
    const updatedMusician = data.musicians.update('00bce127-1bd9-4908-b630-ba079583bab9', {
      name: 'Satchmo'
    });

    assert.deepStrictEqual(updatedMusician, {
      _id: '00bce127-1bd9-4908-b630-ba079583bab9',
      _createdAt: 1546852885560,
      _updatedAt: updatedMusician._updatedAt,
      name: 'Satchmo'
    });
  });

  it('should set _updatedAt for changed musician', async () => {
    const updatedMusician1 = data.musicians.update('00bce127-1bd9-4908-b630-ba079583bab9', {
      name: 'Satchmo'
    });

    await new Promise(resolve => setTimeout(resolve, 250));

    const updatedMusician2 = data.musicians.update('00bce127-1bd9-4908-b630-ba079583bab9', {
      name: 'Test'
    });

    assert.notStrictEqual(updatedMusician1._updatedAt, updatedMusician2._updatedAt);
  });

  it('should set _updatedAt for changed musician', async () => {
    const updatedMusician1 = data.musicians.update('00bce127-1bd9-4908-b630-ba079583bab9', {
      name: 'Satchmo'
    });

    await new Promise(resolve => setTimeout(resolve, 250));

    const updatedMusician2 = data.musicians.update('00bce127-1bd9-4908-b630-ba079583bab9', {
      name: 'Satchmo'
    });

    assert.strictEqual(updatedMusician1._updatedAt, updatedMusician2._updatedAt);
  });

  it('should sort musicians', () => {
    data.musicians.create({
      name: 'Duke Ellington'
    });

    const sortedMusicians = data.musicians.toArray().sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    assert.deepStrictEqual(
      sortedMusicians,
      data.musicians.toArray().sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    );

    assert.notDeepStrictEqual(sortedMusicians, data.musicians.toArray());
  });
});
