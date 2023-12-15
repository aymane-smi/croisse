import { Hunting } from "./hunting";
import { Ranking } from "./ranking.model";

export interface Competition {
    code: String;
    date?: Date| null;
    startTime?: Date;
    endTime?: Date;
    numberOfParticipants?: Number;
    location?: String;
    amount?: Number;
    rankings?: Ranking[];
    huntings?: Hunting[];
}
