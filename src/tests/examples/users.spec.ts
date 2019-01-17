import * as assert from 'assert';

import { UserModel } from '../../examples/models/users';

interface IData {
  users?: UserModel;
}

describe('users', () => {
  const data: IData = {};

  before(async () => {
    data.users = await new UserModel().load();
  });

  it('should create unique user', async () => {
    const currentLength = data.users.length;

    data.users.create({
      email: `test-${Math.random()}@example.com`,
      password: 'password',
      isActive: true
    });

    assert.strictEqual(data.users.length, currentLength + 1);
  });

  it('should fail to create duplicate user', async () => {
    try {
      data.users.create({
        email: 'test@example.com',
        password: 'password',
        isActive: true
      });

      assert.fail('should throw error');
    } catch (error) {
      assert.strictEqual(error.message, 'email already exists: test@example.com');
    }
  });

  it('should get a user', async () => {
    const user = data.users.toArray().find(u => u.email === 'test@example.com');

    assert.strictEqual(user.email, 'test@example.com');
  });

  it('should find users', async () => {
    const foundUsers = data.users.toArray().filter(u => u.isActive === true);

    assert.strictEqual(foundUsers.length, 2);
  });

  it('should update user', async () => {
    const updatedUser = data.users.update(
        '00bce127-1bd9-4908-b630-ba079583bab9',
        {
            email: 'test-new@example.com'
        }
    );

    assert.deepStrictEqual(updatedUser, {
      _id: '00bce127-1bd9-4908-b630-ba079583bab9',
      _createdAt: 1546852885560,
      email: 'test-new@example.com',
      password: 'password',
      isActive: true
    });
  });

  it('should sort users', async () => {
    const sortedUsers = data.users.toArray().sort((a, b) => {
      if (a.email < b.email) {
        return -1;
      } else if (a.email > b.email) {
        return 1;
      }
      return 0;
    });

    assert.deepStrictEqual(
      sortedUsers,
      data.users.toArray().sort((a, b) => {
        if (a.email < b.email) {
          return -1;
        } else if (a.email > b.email) {
          return 1;
        }
        return 0;
      })
    );

    assert.notDeepStrictEqual(sortedUsers, data.users.toArray());
  });
});
