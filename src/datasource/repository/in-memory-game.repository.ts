import { GameDTO } from "../model/game-dto.model";


export class InMemoryGameRepository {
    private game: Map<string, GameDTO> = new Map()//Хранит данные по id

    save(game: GameDTO): void {//Сохноряет или обновляет игру
        this.game.set(game.id, game)
    }

    getById(id: string): GameDTO | undefined {//Достает игру по UUID
        return this.game.get(id)
    }

    getAll(): GameDTO[] {//Возврощает все игры
        return Array.from(this.game.values())
    }

}