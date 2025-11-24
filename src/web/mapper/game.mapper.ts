import { CurrentGame } from "src/domain/model/current-game.model";
import { GameDto } from "../model/game.dto";


//Mapper нужен, чтобы разделять слои
//Mapper делает конвертацию между ними
export class GameMapper {
    static toDTO(domain: CurrentGame): GameDto {//Domain хранение 
        return { id: domain.id, board: domain.board }
    }

    static toDomain(dto: GameDto): CurrentGame {//Бизнес логика
        const game = new CurrentGame(dto.board)
        game.id = dto.id // Сохраняем UUID
        return game
    }

}