# it-inno-hack

Хакатон IT Inno Hack - Кейс №2. Система управления проектами

Сайт: https://it-innohack.ru

## Проектирование

Схема клиент-серверной архитектуры

![](/docs/img/client-server.png)

Схема паттерна MVС

![](/docs/img/mvc.png)

Архитектура

![](/docs/img/architecture.png)

ERD

![](/docs/img/erd.png)

## Dev (localhost)

Swagger API:

http://localhost:8080/swagger-ui.html

Frontend:

http://localhost:3000

## Prod (Docker Compose)

```bash
docker-compose up -d --build
docker-compose down
```
