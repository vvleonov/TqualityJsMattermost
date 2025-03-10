import Container from "../../elements/Container";
import BasePage from "../BasePage";

export default class ProfileSettingsForm extends BasePage {
    #usernameContainer = new Container("#usernameDesc", "Имя пользователя");

    /**
     * [Форма настроек профиля пользователя]
     */
    constructor() {
        super("#accountSettingsHeader", "Страница настроек профиля");
    }

    getUsername() {
        return this.#usernameContainer.getText();
    }
}