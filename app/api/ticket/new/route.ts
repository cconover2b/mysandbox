// app/api/ticket/new/route.ts

// Import necessary modules and functions
import { connectToDB } from "@/lib/db"; // Function to connect to the database
import { storageRef } from "@/lib/firebase"; // Firebase storage reference
import { TicketModel } from "@/schemas/ticket"; // Ticket model schema
import { getDownloadURL, uploadBytes } from "firebase/storage"; // Functions to upload a file and get its download URL from Firebase storage
import { NextRequest, NextResponse } from "next/server"; // Next.js request and response objects

// POST function to handle new ticket creation
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        // Connect to the database
        await connectToDB();

        // Parse the form data from the request
        const formData: FormData = await request.formData();

        // Extract user information from the form data
        const userInfo = formData.get('userinfo') as string;
        const userJson = JSON.parse(userInfo); // Parse the user information JSON string

        // Initialize variables for user information and photo URL
        let downloadUrl = '';
        const submitterName = userJson.submitterName;
        const submitterPhone = userJson.submitterPhone;
        const submitterEmail = userJson.submitterEmail;
        const lat = userJson.latlong.lat;
        const long = userJson.latlong.long;
        const file = formData.get('image') as File; // Extract the image file from the form data

        // Create a ticket object to save to the database
        let ticketToSave = {
            submitterName: submitterName,
            submitterPhone: submitterPhone,
            submitterEmail: submitterEmail,
            photo: '',
            latlong: {
                coordinates: [lat, long] // Store latitude and longitude as coordinates
            }
        };

        // If an image file is provided, upload it to Firebase storage
        if (file) {
            const filename = Date.now() + '.' + file.name.split('.').pop(); // Generate a unique filename
            const ref = storageRef(`${filename}`); // Create a storage reference for the file

            const buffer = Buffer.from(await file.arrayBuffer()); // Convert the file to a buffer
            await uploadBytes(ref, buffer); // Upload the file to Firebase storage
            downloadUrl = await getDownloadURL(ref); // Get the download URL of the uploaded file
            ticketToSave['photo'] = downloadUrl; // Add the download URL to the ticket object
        }

        // Save the ticket to the database
        await TicketModel.create(ticketToSave);

        // Return a success response with the created ticket
        return NextResponse.json({
            message: "Ticket created",
            ticket: ticketToSave
        });
    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);
        // Return an error response
        return Response.json({
            message: "Something went wrong"
        });
    }
}
