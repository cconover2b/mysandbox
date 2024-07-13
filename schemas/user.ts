import { Schema, models, model } from 'mongoose';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  someField?: Schema.Types.ObjectId;
}

// Define the User schema with timestamps
const UserSchema = new Schema<User>({
  firstname: {
    type: String,
    get: toCamelCase,
  },
  lastname: {
    type: String,
    get: toCamelCase,
  },
  email: String,
  password: String,
  // Add the field you want to populate
  someField: { type: Schema.Types.ObjectId, ref: 'SomeOtherModel' },
}, {
  toJSON: { getters: true },
  timestamps: true, // Add this line to enable timestamps
});

// Define a virtual field for the full name
UserSchema.virtual('fullName', {
  getters: true,
}).get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// Function to convert text to camel case
function toCamelCase(text: string): any {
  return `${text.at(0)?.toUpperCase()}${text.substring(1, text.length)}`;
}

// Export the User model
export const UserModel = models.User || model('User', UserSchema);