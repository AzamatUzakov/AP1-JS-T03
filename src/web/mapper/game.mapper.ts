import { CurrentGame } from "src/domain/model/current-game.model";
import { GameDto } from "../model/game.dto";

export class GameMapper {
    static toDTO(domain: CurrentGame): GameDto {
        return { id: domain.id, board: domain.board }
    }

    static toDomain(dto: GameDto): CurrentGame {
        const game = new CurrentGame(dto.board)
        game.id = dto.id
        return game
    }

}