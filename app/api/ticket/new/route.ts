import { connectToDB } from "@/lib/db";
import { storageRef } from "@/lib/firebase";
import { TicketModel } from "@/schemas/ticket";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const formData: FormData = await request.formData();

    const userInfo = formData.get('userinfo') as string;
    if (!userInfo) {
      return new NextResponse("User info is required", { status: 400 });
    }

    const userJson = JSON.parse(userInfo);
    const { submitterName, submitterPhone, submitterEmail, latlong } = userJson;
    if (!submitterName || !submitterPhone || !submitterEmail || !latlong) {
      return new NextResponse("Invalid user info", { status: 400 });
    }

    const { lat, long } = latlong;
    if (typeof lat !== 'number' || typeof long !== 'number') {
      return new NextResponse("Invalid coordinates", { status: 400 });
    }

    const file = formData.get('image') as File;
    let downloadUrl = '';

    if (file) {
      const filename = Date.now() + '.' + file.name.split('.').pop();
      const ref = storageRef(`${filename}`);

      const buffer = Buffer.from(await file.arrayBuffer());
      await uploadBytes(ref, buffer);
      downloadUrl = await getDownloadURL(ref);
    }

    const ticketToSave = {
      submitterName,
      submitterPhone,
      submitterEmail,
      photo: downloadUrl,
      latlong: {
        coordinates: [lat, long],
      },
    };

    // Save the ticket
    const savedTicket = await TicketModel.create(ticketToSave);

    return NextResponse.json({
      message: "Ticket created",
      ticket: savedTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
}