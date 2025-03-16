import BaseElement from "../elements/BaseElement";

export default class Button extends BaseElement {
    /**
     * [Класс для кнопок]
     * @param {string} locator 
     * @param {string} name 
     */
    constructor(locator, name) {
        super(locator, name);
    }

    getText() {
        return this._getElement().invoke("text");
    }
}