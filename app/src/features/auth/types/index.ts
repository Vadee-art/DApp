import { User } from "@/features/user/types";

export type AuthUser = {
  access: string;
  refresh: string;
  user: User;
};
