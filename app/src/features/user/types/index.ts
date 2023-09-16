export type User = {
  about: string;
  address: string;
  city: string | null;
  country: string | null;
  createdAt: Date;
  email: string;
  firstName: string;
  id: number;
  lastLogin: Date | null;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  profilePicture: string | null;
  province: string | null;
  region: string | null;
  userName: string;
  walletAddress: string | null;
}