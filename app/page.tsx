import Image from "next/image";
import { UserProfile } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

const Home = async () => {
    const user = await currentUser();
    if (user !== null) {
        const name = user.fullName;
        const id = user.id;
        const email = user.primaryEmailAddress?.emailAddress;
        const image = user.imageUrl;
        console.log({
            email,
            id,
            name,
            image,
        });
    }
    return (
        <>
            <h1>TaskFlow</h1>
        </>
    );
};

export default Home;
