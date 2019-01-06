import * as assert from 'assert';

import { UserModel, Users } from './models/users';

describe('data', () => {

    let users: UserModel;

    beforeEach(async () => {
        users = await Users.init();
    });

    afterEach(async () => {
        await users.save();
    });

    it('should create unique user', async () => {
        const currentLength = users.length;

        users.push({
            email: `test-${Math.random()}@example.com`,
            password: 'password'
        });

        assert.strictEqual(users.length, currentLength + 1);
    });

    it('should fail to create duplicate user', async () => {
        try {
            users.push({
                email: 'test@example.com',
                password: 'password'
            });

            assert.fail('should throw error');

        } catch (error) {
            assert.strictEqual(error.message, 'email already exists: test@example.com')
        }
    });

    it('should find a user', async () => {
        const user = users.find(u => u.email === 'test@example.com');

        assert.strictEqual(user.email, 'test@example.com');
    });

    it('should sort users', async () => {
        const sortedUsers = users.sort((a, b) => {
            if (a.email < b.email) {
                return -1;
            } else if (a.email > b.email) {
                return 1;
            }
            return 0;
        });

        assert.deepStrictEqual(
            sortedUsers,
            [...users.items].sort((a, b) => {
                if (a.email < b.email) {
                    return -1;
                } else if (a.email > b.email) {
                    return 1;
                }
                return 0;
            })
        );

        assert.notDeepStrictEqual(
            sortedUsers,
            users.items
        );
    });
});