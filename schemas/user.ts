// schemas/user.ts

// Importing necessary types and functions from external libraries
// The User type defines the structure of a user object, ensuring type safety.
import { User } from "@/types";
import { Schema, models, model } from "mongoose";

// Defining the schema for the User model
// A schema in Mongoose is a blueprint for the structure of documents within a collection.
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
// Virtuals are document properties that you can get and set but that do not get persisted to MongoDB.
UserSchema.virtual('fullName', {
    getters: true // Ensure the virtual field is included in JSON output
}).get(function() {
    // The getter function concatenates the first name and last name to form the full name.
    return `${this.firstname} ${this.lastname}`;
});

// Function to convert a string to CamelCase
// This function capitalizes the first letter of the string, making it more readable.
function toCamelCase(text: string): any {
    // Using optional chaining and string manipulation to achieve CamelCase conversion.
    return `${text.at(0)?.toUpperCase()}${text.substring(1, text.length)}`;
}

// Exporting the User model
// If the model already exists, use it; otherwise, create a new model
// This approach prevents model recompilation issues in a development environment.
export const UserModel = models.User || model('User', UserSchema);

// Inspirational Note:
// Remember, every line of code you write is a step towards building something impactful.
// Strive for clarity, maintainability, and efficiency in your code. Happy coding!