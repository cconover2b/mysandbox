// schemas/user.ts
import { User } from "@/types";
import { Schema, models, model, Model } from "mongoose";

// Function to convert text to camel case
function toCamelCase(text: string): string {
    return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
}

// Define the User schema
const UserSchema = new Schema<User>({
    firstname: {
        type: String,
        get: toCamelCase
    },
    lastname: {
        type: String,
        get: toCamelCase
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: { getters: true }
});

// Define a virtual property for full name
UserSchema.virtual('fullName').get(function() {
    return `${this.firstname} ${this.lastname}`;
});

// Register the User model
const UserModel: Model<User> = models.User || model<User>('User', UserSchema);

export default UserModel;