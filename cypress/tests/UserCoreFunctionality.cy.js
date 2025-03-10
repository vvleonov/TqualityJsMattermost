import LoginPage from "../pages/LoginPage";
import PreferencePage from "../pages/PreferencePage";
import ApiUtil from "../support/ApiUtil";
import RandomUtil from "../support/RandomUtil";
import CommonTestData from "../resources/fixtures/commonTestData";
import Logger from "../support/Logger";
import CreateTeamPage from "../pages/CreateTeamPage";
import MainPage from "../pages/main-page/MainPage";
import CustomAssert from "../support/CustomAssert";
import UserCoreFunctionalityData from "../resources/fixtures/userCoreFunctionalityData";
import ImagesUtil from "../support/ImagesUtil";
import StringUtil from "../support/StringUtil";
import DateTimeUtil from "../support/DateTimeUtil";
import TeamCreationPage from "../pages/TeamCreationPage";
import HTTP_STATUS_CODE from "../support/сonstants/HttpStatusCodes";
import FIXTURE_ENCODING from "../support/сonstants/fixtureEncodings";

describe("Mattermost - User Core Functionality", () => {
    const ALIASES = {
        EMAIL: "email",
        USERNAME: "username",
        PASSWORD: "password",
        NEW_USER_ID: "newUserId",
        NEW_USER_TOKEN: "newUserToken",
        NEW_USER_TOKEN_ID: "newUserTokenId",
        CHANNEL_NAME: "channelName",
        CHANNEL_COMMENT: "channelComment",
        SENT_MESSAGE: "sentMessage",
        TEAM_NAME: "teamName",
        TEAM_DESCRIPTION: "teamDescription"
    };

    beforeEach("[API][ОШ] Создание нового пользователя", () => {
        const email = RandomUtil.getFakeEmail();
        const username = RandomUtil.getFakeUsername();
        const password = RandomUtil.getRandomString(UserCoreFunctionalityData.RANDOM_STRING_LENGTH);

        cy.wrapAndAlias(email, ALIASES.EMAIL);
        cy.wrapAndAlias(username, ALIASES.USERNAME);
        cy.wrapAndAlias(password, ALIASES.PASSWORD);

        ApiUtil.createUser(email, username, password, CommonTestData.ADMIN_USER.ADMIN_ACCESS_TOKEN).then(response => {
            CustomAssert.assertEquals(response.status, HTTP_STATUS_CODE.Created, "Проверка кода ответа при создании пользователя");
            CustomAssert.assertStringIsNotNullOrEmpty(response.body.id, "Проверка ID нового пользователя");
            cy.wrapAndAlias(response.body.id, ALIASES.NEW_USER_ID);
            cy.getByAlias(ALIASES.NEW_USER_ID).then(newUserId => {
                ApiUtil.createUserAccessToken(newUserId, CommonTestData.ADMIN_USER.ADMIN_ACCESS_TOKEN).then(response => {
                    CustomAssert.assertEquals(response.status, HTTP_STATUS_CODE.Ok, "Проверка кода ответа при создании токена пользователя");
                    CustomAssert.assertStringIsNotNullOrEmpty(response.body.token, "Проверка токена нового пользователя");
                    CustomAssert.assertStringIsNotNullOrEmpty(response.body.id, "Проверка ID токена нового пользователя");
                    cy.wrapAndAlias(response.body.token, ALIASES.NEW_USER_TOKEN);
                    cy.wrapAndAlias(response.body.id, ALIASES.NEW_USER_TOKEN_ID);
                });
            });
        });

        ApiUtil.ignoreResponse(
            UserCoreFunctionalityData.IGNORED_REQUESTS.PLAYBOOK_IGNORED_REQUESTS.METHOD,
            UserCoreFunctionalityData.IGNORED_REQUESTS.PLAYBOOK_IGNORED_REQUESTS.URL,
            UserCoreFunctionalityData.IGNORED_REQUESTS.PLAYBOOK_IGNORED_REQUESTS.NAME);

        Logger.step("[UI][ОШ] Авторизация нового пользователя через пользовательский интерфейс").then(() => {
            cy.visit(UserCoreFunctionalityData.START_ENDPOINT);

            const loginPage = new LoginPage();
            const preferencePage = new PreferencePage();

            if (preferencePage.isOpened()){
                preferencePage.chooseBrowser();
            }
            
            cy.getByAlias(ALIASES.USERNAME).then(username => {
                loginPage.fillLogin(username);
            });
            cy.getByAlias(ALIASES.PASSWORD).then(password => {
                loginPage.fillPassword(password);
            });
            loginPage.submit();

            const createTeamPage = new CreateTeamPage();
            createTeamPage.chooseTeam(UserCoreFunctionalityData.TEAM_ID, true);
        });
    });

    afterEach("[API][ОШ] Удаление нового пользователя", () => {
        ApiUtil.authorizeAsUser(
            CommonTestData.ADMIN_USER.ADMIN_USERNAME,
            CommonTestData.ADMIN_USER.ADMIN_PASSWORD,
            CommonTestData.ADMIN_USER.ADMIN_ACCESS_TOKEN
        ).then(response => {
            CustomAssert.assertEquals(response.status, HTTP_STATUS_CODE.Ok,
                "Проверка кода ответа при авторизации администратора");
        }).then(() => {
            if (ALIASES.NEW_USER_ID !== undefined && ALIASES.NEW_USER_ID !== null) {
                cy.getByAlias(ALIASES.NEW_USER_ID).then(newUserId => {
                    ApiUtil.removeUserFromTeam(newUserId, CommonTestData.TEAM_ID, CommonTestData.ADMIN_USER.ADMIN_ACCESS_TOKEN).then(response => {
                        CustomAssert.assertEquals(response.status, HTTP_STATUS_CODE.Ok,
                            "Проверка кода ответа при удалении нового пользователя из команды");
                    });
            
                    ApiUtil.deleteUser(newUserId, CommonTestData.ADMIN_USER.ADMIN_ACCESS_TOKEN).then(response => {
                        CustomAssert.assertEquals(response.status, HTTP_STATUS_CODE.Ok,
                            "Проверка кода ответа при удалении нового пользователя");
                    });
                });
            }
        });

        ApiUtil.logout(CommonTestData.ADMIN_USER.ADMIN_ACCESS_TOKEN);
    });

    it("Тест-кейс №1. Отображение профиля пользователя", () => {
        Logger.step("[API] Шаг 1. Загрузка картинки профиля пользователя").then(() => {
            cy.fixture(UserCoreFunctionalityData.PROFILE_IMAGE_NAME, FIXTURE_ENCODING.BINARY).then(file => {
                const name = "image";
                const formData = ApiUtil.constructFormData(file, name, UserCoreFunctionalityData.PROFILE_IMAGE_NAME);
                cy.getByAlias(ALIASES.NEW_USER_ID).then(newUserId => {
                    cy.getByAlias(ALIASES.NEW_USER_TOKEN).then(newUserToken => {
                        ApiUtil.setProfileImage(newUserId, formData, newUserToken).then(response => {
                            CustomAssert.assertEquals(response.status, HTTP_STATUS_CODE.Ok,
                                "Проверка кода ответа при загрузке картинки профиля");
                        });
                    });
                });
            });
        });
        
        Logger.step("[UI] Шаг 2. Проверка отображения имени и картинки профиля пользователя").then(() => {
            const mainPage = new MainPage();
            mainPage.closeOnboardingForm();

            mainPage.openUserDropdown();

            cy.getByAlias(ALIASES.USERNAME).then(expectedUsername => {
                CustomAssert.assertContainsText(mainPage.userDropdownForm.getUsername(),
                expectedUsername.toLowerCase(), "Проверка отображения имени пользователя в меню статусов");
            });
            
            mainPage.userDropdownForm.getProfileImageSrc().then(imageUrl => {
                Logger.debug(`URL картинки: ${imageUrl}`);
                cy.getByAlias(ALIASES.NEW_USER_TOKEN).then(newUserToken => {
                    ApiUtil.downloadProfileImage(imageUrl, newUserToken);
                }).then(response => {
                    CustomAssert.assertEquals(response.status, HTTP_STATUS_CODE.Ok, "Проверка кода ответа при скачивании картинки профиля");
                    cy.writeDownloadedFile(UserCoreFunctionalityData.PROFILE_IMAGE_NAME, response.body, FIXTURE_ENCODING.BINARY);
                }).then(() => 
                {
                    cy.fixture(UserCoreFunctionalityData.PROFILE_IMAGE_NAME, FIXTURE_ENCODING.BINARY).then(expectedImage => {
                        cy.getDownloadedFile(UserCoreFunctionalityData.PROFILE_IMAGE_NAME, FIXTURE_ENCODING.BINARY).then(actualImage => {
                            CustomAssert.assertEquals(ImagesUtil.getImageHash(actualImage),
                                ImagesUtil.getImageHash(expectedImage), "Проверка равенства картинок профиля");
                        })
                    });
                });
            });

            mainPage.userDropdownForm.openProfileSettings();

            cy.getByAlias(ALIASES.USERNAME).then(expectedUsername => {
                CustomAssert.assertEquals(mainPage.profileSettingsForm.getUsername(),
                expectedUsername.toLowerCase(), "Проверка отображения имени пользователя в настройках профиля");
            });

            mainPage.userDropdownForm.closeForm();
        });
    });

    it("Тест-кейс №2. Отправка и получение сообщений в новом канале", () => {
        const mainPage = new MainPage();
        const dateRegex = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}\b/;

        Logger.step("[UI] Шаг 1. Создание нового канала").then(() => {
            mainPage.closeOnboardingForm();
            
            cy.reload();
            mainPage.navigationBarForm.openChannelDropdown();
            mainPage.navigationBarForm.channelDropdownForm.addChannel();

            const channelName = RandomUtil.getRandomString(UserCoreFunctionalityData.NAME_LENGTH);
            const channelComment = RandomUtil.getRandomString(UserCoreFunctionalityData.RANDOM_STRING_LENGTH);

            cy.wrapAndAlias(channelName, ALIASES.CHANNEL_NAME);
            cy.wrapAndAlias(channelComment, ALIASES.CHANNEL_COMMENT);

            mainPage.channelCreationForm.fillChannelName(channelName);
            mainPage.channelCreationForm.choosePublicChannel();
            mainPage.channelCreationForm.fillComments(channelComment);
            mainPage.channelCreationForm.submit();

            cy.wait(UserCoreFunctionalityData.DEFAULT_WAIT_TIME);
            CustomAssert.assertContainsText(cy.url(), channelName.toLowerCase(), "Проверка содержания имени канала в URL");
            CustomAssert.assertEquals(mainPage.getChannelName(), channelName, "Проверка отображения имени канала");

            mainPage.getChannelCreationInfo().then(text => {
                const date = new Date(StringUtil.matchByRegex(text, dateRegex));
                CustomAssert.assertEquals(date.getTime(), DateTimeUtil.getCurrentDate().getTime(), "Проверка совпадения текущей даты и даты создания канала (timestamps)");

                cy.getByAlias(ALIASES.USERNAME).then(username => {
                    CustomAssert.assertContainsText(text, username.toLowerCase(), "Проверка отображения имени пользователя, создавшего канал");
                });
            });
        });

        Logger.step("[UI] Шаг 2. Приглашение другого пользователя в канал").then(() => {
            mainPage.clickAddPeople();
            mainPage.addPeopleForm.fillUsername(CommonTestData.MEMBER_USER.MEMBER_USERNAME, UserCoreFunctionalityData.TYPE_DELAY);
            mainPage.addPeopleForm.clickAddButton();

            cy.wait(UserCoreFunctionalityData.DEFAULT_WAIT_TIME);
            mainPage.getMessages().then(messages => {
                CustomAssert.assertContainsText(messages, CommonTestData.MEMBER_USER.MEMBER_USERNAME, "Проверка наличия имени другого пользователя в чате");
                cy.getByAlias(ALIASES.CHANNEL_COMMENT).then(comment => {
                    CustomAssert.assertContainsText(messages, comment, "Проверка наличия в чате комментария, отправленного при создании канала");
                });
            });
        });

        Logger.step("[UI] Шаг 3. Отправка сообщения").then(() => {
            cy.getByAlias(ALIASES.CHANNEL_NAME).then(channelName => {
                mainPage.navigationBarForm.openChannel(channelName);
            });
            
            const message = RandomUtil.getRandomString(UserCoreFunctionalityData.RANDOM_STRING_LENGTH);
            cy.wrapAndAlias(message, ALIASES.SENT_MESSAGE);
            mainPage.sendMessage(message);

            cy.wait(UserCoreFunctionalityData.DEFAULT_WAIT_TIME);
            mainPage.getMessages().then(messages => {
                CustomAssert.assertContainsText(messages, message, "Проверка наличия ожидаемного сообщения в чате от лица отправителя");
            });
        });

        Logger.step("[UI] Шаг 4. Проверка получения сообщения реципиентом").then(() => {
            mainPage.openUserDropdown();
            mainPage.logout();

            const loginPage = new LoginPage();
            
            loginPage.fillLogin(CommonTestData.MEMBER_USER.MEMBER_USERNAME);
            loginPage.fillPassword(CommonTestData.MEMBER_USER.MEMBER_PASSWORD);
            loginPage.submit();

            cy.getByAlias(ALIASES.CHANNEL_NAME).then(channelName => {
                mainPage.navigationBarForm.openChannel(channelName);
            });

            cy.getByAlias(ALIASES.SENT_MESSAGE).then(message => {
                mainPage.getMessages().then(messages => {
                    CustomAssert.assertContainsText(messages, message, "Проверка наличия ожидаемного сообщения в чате от лица реципиента");
                });
            });
        });
    });

    it("Тест-кейс №3. Создание и переименование команды", () => {
        const mainPage = new MainPage();
    
        Logger.step("[UI] Шаг 1. Создание новой команды").then(() => {
            mainPage.closeOnboardingForm();
    
            mainPage.navigationBarForm.openTeamDropdown();
            mainPage.navigationBarForm.teamDropdownForm.addTeam();
    
            const teamName = `A${RandomUtil.getRandomString(UserCoreFunctionalityData.NAME_LENGTH)}`;
            const teamDescription = RandomUtil.getRandomString(UserCoreFunctionalityData.RANDOM_STRING_LENGTH);
    
            cy.wrapAndAlias(teamName, ALIASES.TEAM_NAME);
            cy.wrapAndAlias(teamDescription, ALIASES.TEAM_DESCRIPTION);
    
            const teamCreationPage = new TeamCreationPage();
            teamCreationPage.fillTeamName(teamName);
            teamCreationPage.submit();
            teamCreationPage.finish();
    
            cy.wait(UserCoreFunctionalityData.DEFAULT_WAIT_TIME);
            CustomAssert.assertContainsText(cy.url(), teamName.toLowerCase(), "Проверка содержания имени команды в URL");
            CustomAssert.assertEquals(mainPage.navigationBarForm.getTeamHeader(), teamName, "Проверка отображения имени команды");
        });

        Logger.step("[UI] Шаг 2. Проверка участников команды").then(() => {
            mainPage.navigationBarForm.openTeamDropdown();
            mainPage.navigationBarForm.teamDropdownForm.openMembersList();

            CustomAssert.assertEquals(mainPage.membersForm.getMemberListLength(), 1, "Проверка количества участников команды");

            mainPage.membersForm.close();
        });    

        Logger.step("[UI] Шаг 3. Изменение названия новой команды").then(() => {
            mainPage.navigationBarForm.openTeamDropdown();
            mainPage.navigationBarForm.teamDropdownForm.openTeamSettings();

            const newTeamName = RandomUtil.getRandomString(UserCoreFunctionalityData.NAME_LENGTH);

            mainPage.teamSettingsForm.renameTeam(newTeamName);
            mainPage.teamSettingsForm.save();
            mainPage.teamSettingsForm.close();

            cy.wait(UserCoreFunctionalityData.DEFAULT_WAIT_TIME);
            CustomAssert.assertEquals(mainPage.navigationBarForm.getTeamHeader(), newTeamName, "Проверка отображения нового имени команды");
        });    
    });
});