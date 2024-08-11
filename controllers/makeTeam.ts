import db from "../db/prismaClient";

type ImakeTeam = (
    name: string,
    admin: string,
    members: string[],
) => Promise<{
    success: boolean;
    teamId: number;
}>;

const makeTeam: ImakeTeam = async (name, admin, members) => {
    const teamMembers = members.map((member) => {
        return { userId: member };
    });
    try {
        const team = await db.team.create({
            data: {
                name: name,
                adminId: admin,
                members: {
                    createMany: {
                        data: teamMembers,
                    },
                },
            },
            select: {
                id: true,
            },
        });
        return {
            success: true,
            teamId: team.id,
        };
    } catch (error) {
        return {
            success: false,
            teamId: -1,
        };
    }
};

export default makeTeam;
