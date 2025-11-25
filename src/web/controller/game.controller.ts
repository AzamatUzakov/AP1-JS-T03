import { BadRequestException, Body, Controller, Param, Post } from "@nestjs/common";
import { GameService } from "src/domain/service/game.service";
import { GameDto } from "../model/game.dto";
import { GameMapper } from "../mapper/game.mapper";



@Controller("game")
export class GameController {
    constructor(private readonly gameService: GameService) { }


    @Post(":id")
    play(@Param("id") id: string, @Body() dto: GameDto): GameDto {
        const currentGame = this.gameService.getGameById(id)

        if (!currentGame) {
            throw new BadRequestException('Игра с таким ID не найдена');
        }

        if (!dto.board) {
            throw new BadRequestException('Тело запроса должно содержать игровое поле');
        }

        if (dto.id && dto.id !== id) {
            throw new BadRequestException('ID в теле запроса не совпадает с URL');
        }

        const newGame = GameMapper.toDomain(dto)
        newGame.id = currentGame.id;

        if (!this.gameService.validateBoard(currentGame, newGame.board)) {
            throw new BadRequestException('Некорректное игровое поле');
        }

        const updatedGame = this.gameService.getNextMove(newGame);
        this.gameService.saveGame(updatedGame);

        return GameMapper.toDTO(updatedGame);
    }
}