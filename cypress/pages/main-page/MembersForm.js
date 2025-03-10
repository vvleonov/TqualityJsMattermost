import BasePage from "../BasePage";
import Container from "../../elements/Container";
import Button from "../../elements/Button";

export default class MembersForm extends BasePage {
    #membersContainer = new Container(".more-modal__row", "Участники");
    #closeButton = new Button(".close", "Кнопка закрыть");

    /**
     * [Форма с участниками команды]
     */
    constructor() {
        super("#teamMemberModalLabel", "Форма с участниками команды");
    }

    getMemberListLength() {
        return this.#membersContainer.getElement().then(elements => {
            return elements.length;
        });
    }
    
    close() {
        this.#closeButton.click();
    }
}