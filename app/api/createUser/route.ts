import { NextApiRequest, NextApiResponse } from "next";
import { UserWebhookEvent } from "@clerk/nextjs/server";
import createUser from "../../../controllers/createUser";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body as UserWebhookEvent;
    if (body.type !== "user.created") {
        return;
    }
    await createUser(
        body.data.id,
        body.data.image_url,
        body.data.email_addresses[0].email_address,
        body.data.first_name + " " + body.data.last_name,
    );
    res.json({
        message: "ok",
    });
}
