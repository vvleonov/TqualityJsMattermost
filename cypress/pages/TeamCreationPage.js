import BasePage from "./BasePage";
import Input from "../elements/Input";
import Button from "../elements/Button";

export default class TeamCreationPage extends BasePage {
    #teamNameInput = new Input("#teamNameInput", "Ввод названия команды");
    #nextButton = new Button("#teamNameNextButton", "Кнопка далее");
    #finishButton = new Button("#teamURLFinishButton", "Кнопка завершить");

     /**
     * [Страница выбора команды]
     */
    constructor() {
        super(".signup__content", "Создание команды");
    }

    fillTeamName(name) {
        this.#teamNameInput.type(name);
    }

    submit() {
        this.#nextButton.click();
    }

    finish() {
        this.#finishButton.click();
    }
}