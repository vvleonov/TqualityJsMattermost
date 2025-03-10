import BaseElement from "../elements/BaseElement";

export default class Input extends BaseElement {
    /**
     * [Класс для элементов с возможностью ввода символов]
     * @param {string} locator 
     * @param {string} name 
     */
    constructor(locator, name) {
        super(locator, name);
    }

    type(text, options) {
        this.getElement().type(text, options);
        return this;
    }

    clear() {
        this.getElement().clear();
        return this;
    }
}