import { Team } from "@prisma/client";
import db from "../db/prismaClient";

type IfindTeam = (id: number) => Promise<Team | null>;

const findTeam: IfindTeam = async (id) => {
    try {
        const team = await db.team.findUnique({
            where: {
                id,
            },
        });
        if (team === null) {
            return null;
        }
        return team;
    } catch (error) {
        return null;
    }
};

export default findTeam;
