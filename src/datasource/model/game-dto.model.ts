
import { GameBoard } from 'src/datasource/model/game-board.model';


//модель для хранения игры
export class GameDTO {
    id: string
    board: GameBoard
    constructor(id: string, board: GameBoard) {
        this.id = id
        this.board = board
    }
}