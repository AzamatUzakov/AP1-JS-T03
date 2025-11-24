import { IGameService } from "../interface/game.service.interface";
import { CurrentGame } from '../model/current-game.model';
import { InMemoryGameRepository } from './../../datasource/repository/in-memory-game.repository';
import { GameMapper } from "src/datasource/mapper/game.mapper";
import { GameBoard } from 'src/datasource/model/game-board.model';


export class GameService implements IGameService {

    constructor(private repo: InMemoryGameRepository) { }

    getNextMove(game: CurrentGame): CurrentGame {
        return game
    }

    validateBoard(game: CurrentGame, newBoard: GameBoard): boolean { //Для валидности
        return true
    }
    isGameOver(game: CurrentGame): boolean {//Оканчание игры
        return false;
    }

    saveGame(game: CurrentGame): void {//Сохроняет игру
        this.repo.save(GameMapper.toDTO(game))
    }

    getGameById(id: string): CurrentGame | undefined { //Бизнес логика
        const dto = this.repo.getById(id)
        return dto ? GameMapper.toDomain(dto) : undefined
    }

}