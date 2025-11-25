import { Module } from "@nestjs/common";
import { GameService } from "./service/game.service";
import { DatasourceModule } from "../datasource/datasource.module";

@Module({
  imports: [DatasourceModule],
  providers: [GameService],
  exports: [GameService],
})
export class DomainModule {}
