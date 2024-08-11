import { User } from "@prisma/client";
import db from "../db/prismaClient";

type IsearchMember = (searchParam: string, team: number) => Promise<User[]>;

const searchMember: IsearchMember = async (searchParam, teamId) => {
    try {
        const members = await db.teamOnUser.findMany({
            where: {
                // todo: use Regex
                teamId: teamId,
                user: {
                    name: searchParam,
                },
            },
            select: {
                user: true,
            },
        });
        const users = members.map((member) => {
            return member.user;
        });
        return users;
    } catch (error) {
        return [];
    }
};

export default searchMember;
