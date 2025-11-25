
import { GameBoard } from 'src/datasource/model/game-board.model';

export class GameDTO {

    id: string
    board: GameBoard
    constructor(id: string, board: GameBoard) {
        this.id = id
        this.board = board
    }
}
//comment