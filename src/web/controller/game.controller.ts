import { BadRequestException, Body, Controller, Param, Post } from "@nestjs/common";
import { GameService } from "src/domain/service/game.service";
import { GameDto } from "../model/game.dto";
import { GameMapper } from "../mapper/game.mapper";



@Controller("game")//маршрутизатор /game
export class GameController {
    constructor(private readonly gameService: GameService) { }


    @Post("id")//endpoint для хода пользователя
    play(@Param("id") id: string, @Body() dto: GameDto): GameDto {
        const currentGame = this.gameService.getGameById(id)//Получаем игру по ID, валидируем поле, делаем ход компьютера, сохраняем

        if (!currentGame) {//Если игра или поле некорректны — возвращаем ошибку
            throw new BadRequestException('Игра с таким ID не найдена');
        }

        const newGame = GameMapper.toDomain(dto)

        if (!this.gameService.validateBoard(currentGame, newGame.board)) {//Если игра или поле некорректны — возвращаем ошибку
            throw new BadRequestException('Некорректное игровое поле');
        }

        const updatedGame = this.gameService.getNextMove(newGame);//Возвращаем обновлённую игру клиенту
        this.gameService.saveGame(updatedGame);

        return GameMapper.toDTO(updatedGame);
    }
}