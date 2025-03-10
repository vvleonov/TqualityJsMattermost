import Button from "../../elements/Button";
import BasePage from "../BasePage";

export default class TeamDropdownForm extends BasePage {
    #createTeamButton = new Button("#createTeam", "Кнопка добавления канала");
    #teamSettingsButton = new Button("#teamSettings", "Кнопка настроек команды");
    #manageMembersButton = new Button("#manageMembers", "Кнопка управдения участниками");

    /**
     * [Форма выпадающего меню для управления командами]
     */
    constructor() {
        super("#invitePeople", "Меню управления командами");
    }

    addTeam() {
        this.#createTeamButton.click();
    }

    openTeamSettings() {
        this.#teamSettingsButton.click();
    }

    openMembersList() {
        this.#manageMembersButton.click();
    }
}