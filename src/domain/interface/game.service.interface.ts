import { CurrentGame } from "src/datasource/model/current-game.model";
import { GameBoard } from "src/datasource/model/game-board.model";



export interface IGameService {
    getNextMove(game: CurrentGame): CurrentGame// Ход компютера
    validateBoard(game: CurrentGame, newBoard: GameBoard): boolean //Проверка коректоности
    isGameOver(game:CurrentGame):boolean //Проверка оканчание игры
}