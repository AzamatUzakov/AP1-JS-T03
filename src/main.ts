import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GameService } from './domain/service/game.service';
import { CurrentGame } from './domain/model/current-game.model';

const DEFAULT_GAME_ID = process.env.SEED_GAME_ID ?? '77d1301a-7b3a-40c9-a3af-164c94b24950';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const gameService = app.get(GameService);
  let game = gameService.getGameById(DEFAULT_GAME_ID);
  if (!game) {
    game = new CurrentGame();
    game.id = DEFAULT_GAME_ID;
    gameService.saveGame(game);
  }

  console.log(`Создана игра с ID: ${game.id}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
