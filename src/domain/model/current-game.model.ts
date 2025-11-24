import { GameBoard } from "../../datasource/model/game-board.model"
import { v4 as uuidv4 } from "uuid"



export class CurrentGame {
    id: string
    board: GameBoard


    constructor(board?: GameBoard) {
        this.id = uuidv4()//уникально id для игры
        this.board = board || [ //// создаём пустое поле 3x3
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],

        ]
    }
}