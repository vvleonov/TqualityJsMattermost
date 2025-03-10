import Button from "../../elements/Button";
import Input from "../../elements/Input";
import BasePage from "../BasePage";

export default class TeamSettingsForm extends BasePage {
    #teamNameInput = new Input("#teamName", "Поле названия команды");
    #saveButton = new Button("[data-testid='mm-save-changes-panel__save-btn']", "Кнопка сохранить");
    #closeButton = new Button("#teamSettingsModalLabel > .close", "Закрыть форму");

    /**
     * [Форма настроек команды]
     */
    constructor() {
        super("#teamDescription", "Настройки команды");
    }

    renameTeam(newName) {
        this.#teamNameInput.clear();
        this.#teamNameInput.type(newName);
    }

    save() {
        this.#saveButton.click();
    }

    close() {
        this.#closeButton.click();
    }
}