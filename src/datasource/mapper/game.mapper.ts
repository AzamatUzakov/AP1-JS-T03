import { CurrentGame } from "../../domain/model/current-game.model";
import { GameDTO } from "../model/game-dto.model";


//Mapper нужен, чтобы разделять слои
//Mapper делает конвертацию между ними
export class GameMapper {
    static toDTO(domain: CurrentGame): GameDTO {//Domain хранение 
        return new GameDTO(domain.id, domain.board)
    }

    static toDomain(dto: GameDTO): CurrentGame {//Бизнес логика
        const game = new CurrentGame(dto.board)
        game.id = dto.id // Сохраняем UUID
        return game
    }
}