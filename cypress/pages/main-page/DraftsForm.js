import BasePage from "../BasePage";
import Button from "../../elements/Button";

export default class DraftsForm extends BasePage {
    #notNowButton = new Button("#tipPreviousButton", "Не сейчас");

    /**
     * [Форма подсказки по черновикам]
     */
    constructor() {
        super("[data-testid='current_tutorial_tip']", "Форма подсказки по черновикам");
    }

    clickNotNowButton() {
        return this.#notNowButton.click();
    }
}