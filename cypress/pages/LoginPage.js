import BasePage from "../pages/BasePage";
import Input from "../elements/Input";
import Button from "../elements/Button";

export default class LoginPage extends BasePage {
    #loginInput = new Input("#input_loginId", "Ввод логина");
    #passwordInput = new Input("#input_password-input", "Ввод пароля");
    #submitButton = new Button("[data-testid='saveSetting']", "Войти");

    /**
     * [Страница логина]
     */
    constructor() {
        super("[data-testid='saveSetting']", "Страница логина");
    }

    fillLogin(login) {
        this.#loginInput.type(login);
    }

    fillPassword(password) {
        this.#passwordInput.type(password);
    }

    clearLogin() {
        this.#loginInput.clear();
    }

    clearPassword() {
        this.#passwordInput.clear();
    }

    submit() {
        this.#submitButton.click();
    }
}