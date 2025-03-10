import Endpoints from "../resources/endpoints";
import HttpClient from "./HttpClient";
import FIXTURE_ENCODING from "./сonstants/fixtureEncodings";
import HTTP_STATUS_CODE from "./сonstants/HttpStatusCodes";

const DEFAULT_HEADERS = {
    "X-Requested-With": "XMLHttpRequest",
};

export default class ApiUtil {
    static #addParameters(url, params = {}) {
        if (!params || Object.keys(params).length === 0) {
            return url;
        }

        const paramString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        return `${url}?${paramString}`;
    }

    static createUser(email, username, password, authToken = null) {
        return HttpClient.post(Endpoints.USERS.BASE, {email: email, username: username, password: password}, authToken);
    }

    static createUserAccessToken(userId, authToken = null, description = "Создание токена нового пользователя") {
        return HttpClient.post(Endpoints.USERS.TOKENS(userId), {description: description}, authToken);
    }

    static deleteUser(userId, authToken = null) {
        const url = this.#addParameters(Endpoints.USERS.USER(userId), {permanent: true});
        return HttpClient.delete(url, authToken, DEFAULT_HEADERS);
    }

    static removeUserFromTeam(userId, teamId, authToken = null) {
        return HttpClient.delete(Endpoints.TEAMS.TEAM_MEMBER(userId, teamId), authToken, DEFAULT_HEADERS);
    }

    static authorizeAsUser(login, password, authToken = null){
        return HttpClient.post(Endpoints.USERS.LOGIN, {login_id: login, password: password}, authToken, DEFAULT_HEADERS);
    }

    static logout(authToken = null) {
        return HttpClient.post(Endpoints.USERS.LOGOUT, {}, authToken, DEFAULT_HEADERS);
    }

    static setProfileImage(userId, image, authToken = null) {
        return HttpClient.post(Endpoints.USERS.IMAGE(userId), image, authToken, DEFAULT_HEADERS);
    }

    static downloadProfileImage(imageUrl, authToken = null) {
        return HttpClient.get(imageUrl, authToken, DEFAULT_HEADERS, FIXTURE_ENCODING.BINARY);
    }

    static constructFormData(file, name, filename) {
        const formData = new FormData();
        const base64Image = Cypress.Blob.binaryStringToBlob(file);
        formData.append(name, base64Image, filename);

        return formData;
    }

    static ignoreResponse(method, url, name, body = "Ignored") {
        cy.intercept(method, url, (request) => {
            request.reply({
                statusCode: HTTP_STATUS_CODE.Ok,
                body: body,
            })
        }).as(name);
    }
}