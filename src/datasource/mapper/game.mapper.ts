import { CurrentGame } from "../../domain/model/current-game.model";
import { GameDTO } from "../model/game-dto.model";

export class GameMapper {
    static toDTO(domain: CurrentGame): GameDTO {
        return new GameDTO(domain.id, domain.board)
    }

    static toDomain(dto: GameDTO): CurrentGame {
        const game = new CurrentGame(dto.board)
        game.id = dto.id
        return game
    }
}