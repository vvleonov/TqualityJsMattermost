import Container from "../elements/Container";
import BasePage from "./BasePage";
import ExceptionHelper from "../support/ExceptionHelper";

export default class CreateTeamPage extends BasePage {
    #teamContainer = new Container("#teamsYouCanJoinContent", "Выбор команды");
    #uncaughtException = "scrollHeight";

     /**
     * [Страница выбора команды]
     */
    constructor() {
        super("#teamsYouCanJoinContent", "Выбор команды");
    }

    chooseTeam(id, ignoreException = false) {
        if (ignoreException) {
            ExceptionHelper.ignoreUncaughtException(this.#uncaughtException);
        }

        this.#teamContainer.clickChild(id);
    }
}