import { faker } from "@faker-js/faker";

export default class RandomUtil {
    static getRandomString(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < length; i++) {
            const rndIndex = Math.floor(Math.random() * characters.length);
            result += characters[rndIndex];
        }

        return result;
    }

    static getFakeEmail() {
        return faker.internet.email();
    }

    static getFakeUsername() {
        return faker.internet.username();
    }
}