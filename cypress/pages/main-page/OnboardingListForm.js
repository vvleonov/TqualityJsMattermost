import BasePage from "../BasePage";
import Button from "../../elements/Button";

export default class OnboardingListForm extends BasePage {
    #closeButton = new Button("[data-cy='onboarding-task-list-action-button']", "Закрыть список");

    /**
     * [Привественная форма]
     */
    constructor() {
        super("[data-cy='onboarding-task-list-overlay']", "Список фичей");
    }

    closeForm() {
        this.#closeButton.click();
    }
}