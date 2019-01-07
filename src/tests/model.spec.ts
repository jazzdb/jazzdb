import * as assert from 'assert';

import { UserModel, Users } from './models/users';

describe('data', () => {

    let users: UserModel;

    before(async () => {
        users = await Users.init();
    });

    it('should create unique user', async () => {
        const currentLength = users.length;

        users.push({
            email: `test-${Math.random()}@example.com`,
            password: 'password',
            isActive: true
        });

        assert.strictEqual(users.length, currentLength + 1);
    });

    it('should fail to create duplicate user', async () => {
        try {
            users.push({
                email: 'test@example.com',
                password: 'password',
                isActive: true
            });

            assert.fail('should throw error');

        } catch (error) {
            assert.strictEqual(error.message, 'email already exists: test@example.com')
        }
    });

    it('should get a user', async () => {
        const user = users.find(u => u.email === 'test@example.com');

        assert.strictEqual(user.email, 'test@example.com');
    });

    it('should find users', async () => {
        const foundUsers = users.filter(u => u.isActive === true);

        assert.strictEqual(foundUsers.length, 2);
    });

    it('should update user', async () => {
        const newEmail = 'test-new-email@example.com';

        const user = users.find(u => u.email === 'test@example.com');
        user.email = newEmail;

        const updatedUser = users.find(u => u.email === newEmail);

        assert.strictEqual(updatedUser.email, newEmail);
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