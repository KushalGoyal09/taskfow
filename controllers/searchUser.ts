import { User } from "@prisma/client";
import db from "../db/prismaClient";

type IsearchUser = (searchParam: string) => Promise<User[]>;

const searchUser: IsearchUser = async (searchParam) => {
    try {
        const users = await db.user.findMany({
            // Todo: use regex for finding people by email and name
            where: {
                name: searchParam,
            },
        });
        return users;
    } catch (error) {
        return [];
    }
};

export default searchUser;
