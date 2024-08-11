import db from "../db/prismaClient";

type IaddTask = (
    title: string,
    teamId?: number,
    description?: string,
    dueDate?: Date,
    assaignedTo?: string,
) => Promise<boolean>;

const addTask: IaddTask = async (
    title,
    teamId,
    description,
    dueDate,
    assaignedTo,
) => {
    try {
        await db.task.create({
            data: {
                title,
                teamId,
                description,
                dueDate,
                assigneeId: assaignedTo,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export default addTask;
