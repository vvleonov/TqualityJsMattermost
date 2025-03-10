export default {
    START_ENDPOINT: "/login",
    RANDOM_STRING_LENGTH: 10,
    NAME_LENGTH: 5,
    DEFAULT_WAIT_TIME: 3000,
    TYPE_DELAY: 100,
    TEAM_ID: "#test",
    TEAM_NAME: "test",
    PROFILE_IMAGE_NAME: "profile.jpg",
    IGNORED_REQUESTS: {
        PLAYBOOK_IGNORED_REQUESTS: {
            URL: "/plugins/playbooks/api/v0/settings",
            METHOD: "GET",
            NAME: "Запрос к настройкам playbooks"
        }
    }
}