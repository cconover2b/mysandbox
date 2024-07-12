// app/api/user/route.ts
import { connectToDB } from "@/lib/db";
import UserModel from "@/schemas/user"; // Ensure this is a default export

export async function GET() {
    try {
        await connectToDB();

        const users = await UserModel.find({});

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            message: "Failed to get users"
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}