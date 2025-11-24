import { Module } from "@nestjs/common";
import { GameController } from "./controller/game.controller";
import { GameService } from "src/domain/service/game.service";
import { InMemoryGameRepository } from "src/datasource/repository/in-memory-game.repository";

@Module({
    controllers: [GameController],
    providers: [
        GameService,
        InMemoryGameRepository// репозиторий внедряется в сервис
    ]
})
//Контроллер знает только о сервисе, сервис знает репозиторий
//NestJS сам создаёт экземпляры(Dependency Injection)
//Мы подключили репозиторий напрямую, чтобы сервис мог работать с ним

export class WebModule { }