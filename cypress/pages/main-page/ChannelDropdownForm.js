import Button from "../../elements/Button";
import BasePage from "../BasePage";

export default class ChannelDropdownForm extends BasePage {
    static ADD_CHANNEL_SELECTOR = "#showNewChannel";

    #createChannelButton = new Button(ChannelDropdownForm.ADD_CHANNEL_SELECTOR, "Кнопка добавления канала");

    /**
     * [Форма выпадающего меню для добавления каналов]
     */
    constructor() {
        super(ChannelDropdownForm.ADD_CHANNEL_SELECTOR, "Меню управления каналами");
    }

    addChannel() {
        this.#createChannelButton.click();
    }
}