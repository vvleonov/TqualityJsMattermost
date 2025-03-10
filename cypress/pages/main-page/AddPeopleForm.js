import Button from "../../elements/Button";
import Input from "../../elements/Input";
import BasePage from "../BasePage";

export default class AddPeopleForm extends BasePage {
    #searchPeopleInput = new Input("#selectItems", "Поиск пользователей");
    #addButton = new Button("[data-testid='saveSetting']", "Кнопка добавления");

    /**
     * [Форма приглашения в канал]
     */
    constructor() {
        super("#channelInviteModalLabel", "Форма приглашения в канал");
    }

    fillUsername(user, delay) {
        return this.#searchPeopleInput.type(user, {delay: delay}).type("{enter}");
    }

    clickAddButton() {
        this.#addButton.click();
    }
}