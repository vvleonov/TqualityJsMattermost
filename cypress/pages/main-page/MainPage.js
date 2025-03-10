import Container from "../../elements/Container";
import BasePage from "../BasePage";
import OnboardingListForm from "../main-page/OnboardingListForm";
import UserDropdownForm from "../main-page/UserDropdownForm";
import ProfileSettingsForm from "../main-page/ProfileSettingsForm";
import ChannelCreationForm from "./ChannelCreationForm";
import NavigationBarForm from "./NavigationBarForm";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import DraftsForm from "./DraftsForm";
import AddPeopleForm from "./AddPeopleForm";
import TeamSettingsForm from "./TeamSettingsForm";
import MembersForm from "./MembersForm";

export default class MainPage extends BasePage {
    profileSettingsForm = new ProfileSettingsForm();
    userDropdownForm = new UserDropdownForm();
    channelCreationForm = new ChannelCreationForm();
    navigationBarForm = new NavigationBarForm();
    addPeopleForm = new AddPeopleForm();
    teamSettingsForm = new TeamSettingsForm();
    membersForm = new MembersForm();

    #preferencesForm = new OnboardingListForm();
    #draftsForm = new DraftsForm();
    #profileContainer = new Container("[aria-label*='Select to open profile and status menu']", "Иконка профиля");
    #channelIntroTitleContainer = new Container(".channel-intro__title", "Название канала");
    #channelCreationInfoContainer = new Container(".channel-intro__created", "Информация о создании канала");
    #textboxInput = new Input("[data-testid='post_textbox']", "Поле ввода сообщений");
    #sendMessageButton = new Button("[data-testid='SendMessageButton']", "Кнопка отправки сообщения");
    #messagesContainer = new Container(".post-list__dynamic", "Последнее сообщение");
    #addPeopleButton = new Button(".MoreThanMaxFreeUsers", "Пригласить пользователей");
    #logoutButton = new Button("#logout", "Кнопка выйти из аккаунта");

    /**
     * [Главная страница]
     */
    constructor() {
        super("#channel_view", "Главная страница");
    }

    closeOnboardingForm() {
        this.#preferencesForm.closeForm();
    }

    openUserDropdown() {
        this.#profileContainer.click();
    }

    getChannelName() {
        return this.#channelIntroTitleContainer.getText();
    }

    getChannelCreationInfo() {
        return this.#channelCreationInfoContainer.getText();
    }

    sendMessage(text) {
        this.#textboxInput.type(text);
        this.#sendMessageButton.click();

        if (this.#draftsForm.isOpened()) {
            this.#draftsForm.clickNotNowButton();
            this.#sendMessageButton.click();
        }
    }

    getMessages() {
        return this.#messagesContainer.getText();
    }

    clickAddPeople() {
        this.#addPeopleButton.click();
    }

    logout() {
        this.#logoutButton.click();
    }
}