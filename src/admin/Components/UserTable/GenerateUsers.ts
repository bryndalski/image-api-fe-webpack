import { faker } from '@faker-js/faker';
import { User } from '../../../index/types';
import {v4} from "uuid";

/**
 * Generates a list of users with the given count.
 * @param count {number} The number of users to generate.
 * @returns {User[]} The list of generated users.
 */
export function generateUsers(count: number): User[] {
    const users: User[] = [];

    for (let i = 0; i < count; i++) {
        const user: User = {
            id: faker.string.uuid(),
            email: faker.internet.email(),
            givenName: faker.name.firstName(),
            familyName: faker.name.lastName(),
        };

        users.push(user);
    }

    return users;
}

