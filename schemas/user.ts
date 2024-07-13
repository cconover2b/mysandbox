// schemas/user.ts

// Importing necessary types and functions from external libraries
import { User } from "@/types";
import { Schema, models, model } from "mongoose";

// Defining the schema for the User model
const UserSchema = new Schema<User>({
    firstname: {
        type: String, // First name of the user
        get: toCamelCase // Getter function to convert the name to CamelCase
    },
    lastname: {
        type: String, // Last name of the user
        get: toCamelCase // Getter function to convert the name to CamelCase
    },
    email: String, // Email address of the user
    password: String // Password of the user (should be hashed in production)
}, {
    toJSON: { getters: true } // Ensure getters are applied when converting to JSON
});

// Adding a virtual field 'fullName' to the schema
UserSchema.virtual('fullName', {
    getters: true // Ensure the virtual field is included in JSON output
}).get(function() {
    return `${this.firstname} ${this.lastname}`; // Concatenate first name and last name
});

// Function to convert a string to CamelCase
function toCamelCase(text: string): any {
    return `${text.at(0)?.toUpperCase()}${text.substring(1, text.length)}`; // Capitalize the first letter and concatenate with the rest of the string
}

// Exporting the User model
// If the model already exists, use it; otherwise, create a new model
export const UserModel = models.User || model('User', UserSchema);
