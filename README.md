﻿# TqualityJsMattermost

Для установки необходимых пакетов нужно выполнить команду в корневой директории:
```bash
npm install
```

Для запуска приложения нужно выполнить команду из директории docker:
```bash
docker compose -f docker-compose.yml -f docker-compose.without-nginx.yml up -d
```

Данные тестовых пользователей и команд хранятся в следующих файлах:

- `cypress/resources/fixtures/commonTestData.js`
- `cypress/resources/fixtures/userCoreFunctionalityData.js`

*Файлы с подготовленными данными лежат в директории cypress\resources\configured - можно воспользоваться ими*

Запустить тесты можно командой:

```bash
npx cypress run --headless --browser chrome
```

Видео с запуском тестового набора находится в директории:

```plaintext
cypress/videos
```

Описание тест-кейсов находится в файле:

```plaintext
MattermostTestCases.md
```
