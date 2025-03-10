import Button from "../elements/Button";
import BasePage from "../pages/BasePage";

export default class PreferencePage extends BasePage {
    static BROWSER_VIEW_SELECTOR = "span:contains('View in Browser')";
    
    #rememberButton = new Button(".get-app__checkbox", "Запомнить выбор");
    #browserViewButton = new Button(PreferencePage.BROWSER_VIEW_SELECTOR, "Просмотр в браузере");

    /**
     * [Страница выбора предпочтений запуска]
     */
    constructor() {
        super(PreferencePage.BROWSER_VIEW_SELECTOR, "Страница выбора приложения");
    }

    chooseBrowser() {
        this.#rememberButton.click();
        this.#browserViewButton.click();
    }
}