import { City, Country, Region } from "@/features/geo/types";

export type User = {
  about: string;
  address: string;
  country: Country | null;
  region: Region | null;
  city: City | null;
  createdAt: Date;
  email: string;
  firstName: string;
  id: number;
  lastLogin: Date | null;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  profilePicture: string | null;
  userName: string;
  walletAddress: string | null;
}