import { User } from "@prisma/client";
import db from "../db/prismaClient";

type IgetAllMembers = (teamId: number) => Promise<User[]>

const getAllMembers: IgetAllMembers = async (teamId) => {   
    try {
        const members = await db.teamOnUser.findMany({
            where: {
                teamId,
            },
            select: {
                user: true
            }
        })
        return members.map(member => {
            return member.user
        })
    } catch (error) {
        return [];
    }
    
    
}

export default getAllMembers;