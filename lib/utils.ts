// lib/utils.ts

// Importing necessary functions and types from external libraries
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { hash, compare } from 'bcrypt-ts';

// Base URL for API endpoints
const BASE_URL = "http://localhost:3000/api/";

// Utility function to merge class names using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to build a full URL from an endpoint and the base URL
export function buildUrl(endPoint: string): string {
  const url = new URL(endPoint, BASE_URL);
  return url.href;
}

// Utility function to hash a password using bcrypt-ts
export async function hashPassword(nakedPassword: string) {
  const hashedPassword = await hash(nakedPassword, 10); // 10 is the salt rounds
  return hashedPassword;
}

// Utility function to compare a plain password with a hashed password using bcrypt-ts
export async function comparePassword(nakedPassword: string, hashedPassword: string) {
  const result = await compare(nakedPassword, hashedPassword);
  return result;
}