import { UserWebhookEvent } from "@clerk/nextjs/server";
import createUser from "../../../controllers/createUser";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
    const body = (await req.json()) as UserWebhookEvent;
    if (body.type !== "user.created") {
        return;
    }
    await createUser(
        body.data.id,
        body.data.image_url,
        body.data.email_addresses[0].email_address,
        body.data.first_name + " " + body.data.last_name,
    );
    return new Response("", { status: 200 });
}
