// app/api/ticket/new/route.ts
import { connectToDB } from "@/lib/db";
import { storageRef } from "@/lib/firebase";
import { TicketModel } from "@/schemas/ticket";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

interface UserInfo {
    submitterName: string;
    submitterPhone: string;
    submitterEmail?: string;
    latlong: {
        lat: number;
        long: number;
    };
}

export async function POST(request: NextRequest) {
    try {
        await connectToDB();

        const formData: FormData = await request.formData();

        const userInfo = formData.get('userinfo') as string;
        const userJson: UserInfo = JSON.parse(userInfo);
        let downloadUrl = '';
        const { submitterName, submitterPhone, submitterEmail, latlong } = userJson;
        const { lat, long } = latlong;
        const file = formData.get('image') as File;

        let ticketToSave = {
            submitterName,
            submitterPhone,
            submitterEmail,
            photo: '',
            latlong: {
                coordinates: [lat, long]
            }
        };

        if (file) {
            const filename = `${Date.now()}.${file.name.split('.').pop()}`;
            const ref = storageRef(`${filename}`);

            const buffer = Buffer.from(await file.arrayBuffer());
            await uploadBytes(ref, buffer);
            downloadUrl = await getDownloadURL(ref);
            ticketToSave.photo = downloadUrl;
        }

        // Save the ticket
        await TicketModel.create(ticketToSave);

        return NextResponse.json({
            message: "Ticket created",
            ticket: ticketToSave
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}