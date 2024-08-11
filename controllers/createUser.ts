import db from "../db/prismaClient";
type IcreateUser = (
    id: string,
    imageUrl: string,
    email: string,
    name: string,
) => Promise<boolean>;

const createUser: IcreateUser = async (id, imageUrl, email, name) => {
    try {
        await db.user.create({
            data: {
                name,
                email,
                imageUrl,
                id,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export default createUser;
