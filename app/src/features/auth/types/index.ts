export type AuthUser = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  isAdmin: boolean;
  token: string;
};
