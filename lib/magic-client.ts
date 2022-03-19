import { Magic } from "magic-sdk";

const API_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY || "";
const createMagic = () => {

  return (
    typeof window !== "undefined" &&
    new Magic(API_KEY)
  );
} 

export const magic = createMagic();

console.log("magic setup", magic);
