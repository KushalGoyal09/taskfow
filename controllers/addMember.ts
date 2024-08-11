import db from "../db/prismaClient";

type IaddMember = (teamId: number, member: string) => Promise<boolean>;

const addMember: IaddMember = async (teamId, member) => {
    try {
        await db.team.update({
            where: {
                id: teamId,
            },
            data: {
                members: {
                    create: {
                        userId: member,
                    },
                },
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export default addMember;
