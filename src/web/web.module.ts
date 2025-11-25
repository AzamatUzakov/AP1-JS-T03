import { Module } from "@nestjs/common";
import { GameController } from "./controller/game.controller";
import { DomainModule } from "../domain/domain.module";

@Module({
    imports: [DomainModule],
    controllers: [GameController],
})
//Контроллер знает только о сервисе, сервис знает репозиторий
//NestJS сам создаёт экземпляры(Dependency Injection)
//Мы подключили репозиторий через DomainModule, чтобы слой web ничего не знал о datasource
export class WebModule { }