import { Injectable } from "@nestjs/common";
import { IGameService } from "../interface/game.service.interface";
import { CurrentGame } from "../model/current-game.model";
import { InMemoryGameRepository } from "../../datasource/repository/in-memory-game.repository";
import { GameMapper } from "src/datasource/mapper/game.mapper";
import { GameBoard } from "src/datasource/model/game-board.model";

const HUMAN = 1;
const COMPUTER = 2;

@Injectable()
export class GameService implements IGameService {
    constructor(private repo: InMemoryGameRepository) { }

    getNextMove(game: CurrentGame): CurrentGame { // запускает Минимакс и возвращает ход компьютера
        if (this.isGameOver(game)) {
            return game;
        }

        const boardCopy = this.cloneBoard(game.board);
        const bestMove = this.findBestMove(boardCopy);

        if (!bestMove) {
            return game;
        }

        boardCopy[bestMove.row][bestMove.col] = COMPUTER;

        const updatedGame = new CurrentGame(boardCopy);
        updatedGame.id = game.id;

        return updatedGame;
    }

    validateBoard(game: CurrentGame, newBoard: GameBoard): boolean { // убеждается, что игрок сделал ровно один допустимый ход
        if (!this.isBoardShapeValid(newBoard) || this.isGameOver(game)) {
            return false;
        }

        const diffs = this.countBoardDiffs(game.board, newBoard);
        if (diffs.invalidChange || diffs.playerMoves !== 1 || diffs.computerMoves !== 0) {
            return false;
        }

        return this.countMarks(newBoard, HUMAN) <= this.countMarks(newBoard, COMPUTER) + 1;
    }

    isGameOver(game: CurrentGame): boolean { // проверяет победу или ничью
        return this.checkWinner(game.board) !== null || this.isBoardFull(game.board);
    }

    saveGame(game: CurrentGame): void { // сохраняет текущее состояние в репозитории
        this.repo.save(GameMapper.toDTO(game));
    }

    getGameById(id: string): CurrentGame | undefined { // достаёт игру по UUID
        const dto = this.repo.getById(id);
        return dto ? GameMapper.toDomain(dto) : undefined;
    }

    private cloneBoard(board: GameBoard): GameBoard { // создаёт копию матрицы, чтобы не мутировать оригинал
        return board.map(row => [...row]);
    }

    private isBoardShapeValid(board: GameBoard): boolean { // проверяет размер 3x3 и допустимые значения
        return board.length === 3 && board.every(row => row.length === 3 && row.every(cell => [0, HUMAN, COMPUTER].includes(cell)));
    }

    private countBoardDiffs(original: GameBoard, updated: GameBoard) { // считает сколько клеток изменилось
        let playerMoves = 0;
        let computerMoves = 0;
        let invalidChange = false;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (original[r][c] === updated[r][c]) continue;

                if (original[r][c] === 0 && updated[r][c] === HUMAN) {
                    playerMoves++;
                } else if (original[r][c] === 0 && updated[r][c] === COMPUTER) {
                    computerMoves++;
                } else {
                    invalidChange = true;
                }
            }
        }

        return { playerMoves, computerMoves, invalidChange };
    }

    private countMarks(board: GameBoard, mark: number): number { // считает количество ходов каждого игрока
        return board.flat().filter(cell => cell === mark).length;
    }

    private isBoardFull(board: GameBoard): boolean { // определяет, заполнено ли поле
        return board.every(row => row.every(cell => cell !== 0));
    }

    private checkWinner(board: GameBoard): number | null { // ищет три в ряд и возвращает победителя
        const lines = [
            board[0], board[1], board[2],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
        ];

        for (const line of lines) {
            if (line[0] !== 0 && line[0] === line[1] && line[1] === line[2]) {
                return line[0];
            }
        }

        return null;
    }

    private minimax(board: GameBoard, depth: number, isMaximizing: boolean): number { // классический алгоритм Минимакс
        const winner = this.checkWinner(board);
        if (winner === COMPUTER) {
            return 10 - depth;
        }
        if (winner === HUMAN) {
            return depth - 10;
        }
        if (this.isBoardFull(board)) {
            return 0;
        }

        if (isMaximizing) {
            let best = -Infinity;
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    if (board[r][c] === 0) {
                        board[r][c] = COMPUTER;
                        best = Math.max(best, this.minimax(board, depth + 1, false));
                        board[r][c] = 0;
                    }
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    if (board[r][c] === 0) {
                        board[r][c] = HUMAN;
                        best = Math.min(best, this.minimax(board, depth + 1, true));
                        board[r][c] = 0;
                    }
                }
            }
            return best;
        }
    }

    private findBestMove(board: GameBoard): { row: number; col: number } | null { // подбирает клетку с максимальным скором
        let bestVal = -Infinity;
        let move: { row: number; col: number } | null = null;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === 0) {
                    board[r][c] = COMPUTER;
                    const moveVal = this.minimax(board, 0, false);
                    board[r][c] = 0;

                    if (moveVal > bestVal) {
                        bestVal = moveVal;
                        move = { row: r, col: c };
                    }
                }
            }
        }

        return move;
    }
}
