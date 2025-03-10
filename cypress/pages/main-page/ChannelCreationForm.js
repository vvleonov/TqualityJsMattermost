import Button from "../../elements/Button";
import Input from "../../elements/Input";
import BasePage from "../BasePage";

export default class ChannelCreationForm extends BasePage {
    #channelNameInput = new Input("#input_new-channel-modal-name", "Имя канала");
    #publicButton = new Button("#public-private-selector-button-O", "Публичный канал");
    #commentsInput = new Input("#new-channel-modal-purpose", "Комментарий при создании канала");
    #submitButton = new Button("[type='submit']", "Кнопка создания канала");

    /**
     * [Форма создания канала]
     */
    constructor() {
        super(".new-channel-modal-body", "Форма создания канала");
    }

    fillChannelName(name) {
        this.#channelNameInput.type(name);
    }

    choosePublicChannel() {
        this.#publicButton.click();
    }

    fillComments(text) {
        this.#commentsInput.type(text);
    }

    submit() {
        this.#submitButton.click();
    }
}