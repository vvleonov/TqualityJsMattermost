import Logger from "./Logger";

export default class CustomAssert {
    static #isChainable(obj) {
        return obj && typeof obj.then === "function";
    }

    static assertStringIsNotNullOrEmpty(value, message) {
        Logger.assertion(message).then(() => {
            expect(value).to.not.be.null;
            expect(value).to.not.be.undefined;
            expect(value).to.not.be.empty;
        });
    }

    static assertContainsText(actualText, expectedText, message) {
        Logger.assertion(message).then(() => {
            if (!this.#isChainable(actualText)) {
                cy.wrap(actualText).should("contain", expectedText);
            }
            else {
                actualText.should("contain", expectedText);
            }
        });
    }

    static assertEquals(actualValue, expectedValue, message) {
        Logger.assertion(message).then(() => {
            if (!this.#isChainable(actualValue)) {
                cy.wrap(actualValue).should("eq", expectedValue);
            }
            else {
                actualValue.should("eq", expectedValue);
            }
        });
    }
}