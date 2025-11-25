import { Module } from "@nestjs/common";
import { GameController } from "./controller/game.controller";
import { DomainModule } from "../domain/domain.module";

@Module({
    imports: [DomainModule],
    controllers: [GameController],
})
export class WebModule { }