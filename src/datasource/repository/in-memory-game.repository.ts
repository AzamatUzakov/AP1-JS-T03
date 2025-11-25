import { Injectable } from "@nestjs/common";
import { GameDTO } from "../model/game-dto.model";

@Injectable()
export class InMemoryGameRepository {
    private game: Map<string, GameDTO> = new Map()

    save(game: GameDTO): void {
        this.game.set(game.id, game)
    }

    getById(id: string): GameDTO | undefined {
        return this.game.get(id)
    }

    getAll(): GameDTO[] {
        return Array.from(this.game.values())
    }
}