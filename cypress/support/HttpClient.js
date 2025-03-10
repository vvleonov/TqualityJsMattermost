import HTTP_METHOD from "../support/сonstants/httpMethods";

export default class HttpClient {
    static get(resource, authToken = null, headers = {}, encoding = null) {
        return cy.request({
            method: HTTP_METHOD.GET,
            url: resource,
            encoding: encoding,
            headers: {
                ...headers,
                Authorization: authToken ? `Bearer ${authToken}` : undefined
            }
        });
    }

    static post(resource, body, authToken = null, headers = {}) {
        return cy.request({
            method: HTTP_METHOD.POST,
            url: resource,
            body: body,
            headers: {
                ...headers,
                Authorization: authToken ? `Bearer ${authToken}` : undefined
            }
        });
    }

    static delete(resource, authToken = null, headers = {}) {
        return cy.request({
            method: HTTP_METHOD.DELETE,
            url: resource,
            headers: {
                ...headers,
                Authorization: authToken ? `Bearer ${authToken}` : undefined
            }
        });
    }
}