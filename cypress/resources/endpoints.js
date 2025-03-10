const BASE_USERS = "/api/v4/users";
const BASE_TEAMS = "/api/v4/teams";

export default {
    USERS: {
        BASE: BASE_USERS,
        LOGIN: `${BASE_USERS}/login`,
        LOGOUT: `${BASE_USERS}/logout`,
        IMAGE: (userId) => `${BASE_USERS}/${userId}/image`,
        TOKENS: (userId) => `${BASE_USERS}/${userId}/tokens`,
        USER: (userId) => `${BASE_USERS}/${userId}`
    },
    TEAMS: {
        BASE: BASE_TEAMS,
        TEAM_MEMBER: (userId, teamId) => `${BASE_TEAMS}/${teamId}/members/${userId}`
    }
}