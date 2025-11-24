import { GameBoard } from "src/datasource/model/game-board.model";


//это объект, который мы отправляем/получаем через API
export class GameDto {
    id: string;
    board: GameBoard
}