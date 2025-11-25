import { Module } from "@nestjs/common";
import { InMemoryGameRepository } from "./repository/in-memory-game.repository";

@Module({
    providers: [InMemoryGameRepository],
    exports: [InMemoryGameRepository],
})
export class DatasourceModule { }
