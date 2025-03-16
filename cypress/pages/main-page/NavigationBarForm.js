import Button from "../../elements/Button";
import BasePage from "../BasePage";
import ChannelDropdownForm from "./ChannelDropdownForm";
import Container from "../../elements/Container";
import TeamDropdownForm from "./TeamDropdownForm";

export default class NavigationBarForm extends BasePage {
    channelDropdownForm = new ChannelDropdownForm();
    teamDropdownForm = new TeamDropdownForm();

    #addChannelsButton = new Button(".AddChannelDropdown_dropdownButton", "Кнопка добавления канала");
    #sidebarChannelContainer = new Container("#sidebar-droppable-categories", "Указатель на канал");
    #teamDropdownContainer = new Container(".test-team-header", "Открыть меню команд");

    /**
     * [Навигационная панель]
     */
    constructor() {
        super("#SidebarContainer", "Навигационная панель");
    }
    
    openChannelDropdown() {
        this.#addChannelsButton.click();
    }

    openTeamDropdown() {
        this.#teamDropdownContainer.click();
    }

    getTeamHeader() {
        return this.#teamDropdownContainer.getText();
    }

    openChannel(channelName) {
        this.#sidebarChannelContainer.clickChildByText(channelName);
    }
}