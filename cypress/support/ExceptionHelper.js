export default class ExceptionHelper {
    static ignoreUncaughtException(messageSubstring) {
        cy.on("uncaught:exception", (err) => {
            if (err.message.includes(messageSubstring)) {
                return false;
            }
            
            return true;
        });
    }
}