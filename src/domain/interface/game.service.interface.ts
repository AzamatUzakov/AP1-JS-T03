import { CurrentGame } from "src/domain/model/current-game.model";
import { GameBoard } from "src/datasource/model/game-board.model";



export interface IGameService {
    getNextMove(game: CurrentGame): CurrentGame
    validateBoard(game: CurrentGame, newBoard: GameBoard): boolean
    isGameOver(game: CurrentGame): boolean
}