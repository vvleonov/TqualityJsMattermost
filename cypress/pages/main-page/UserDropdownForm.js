import BasePage from "../BasePage";
import Container from "../../elements/Container";
import Button from "../../elements/Button";

export default class UserDropdownForm extends BasePage {
    #usernameContainer = new Container(".username-wrapper", "Имя пользователя");
    #profileContainer = new Container("#accountSettings", "Настройки профиля");
    #profileImageContainer = new Container(".Avatar", "Картинка профиля");
    #closeButton = new Button("[aria-label='Close']", "Закрыть настройки профиля");

    /**
     * [Форма выпадающего меню со статусами и настройками профиля пользователя]
     */
    constructor() {
        super("#status-drop-down-menu-list", "Меню статусов пользователя");
    }

    getUsername() {
        return this.#usernameContainer.getText();
    }

    openProfileSettings() {
        this.#profileContainer.click();
    }

    getProfileImageSrc() {
        return this.#profileImageContainer.getAttribute("src");
    }

    closeForm() {
        this.#closeButton.click();
    }
}