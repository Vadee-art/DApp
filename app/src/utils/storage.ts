import { AuthUser } from "@/features/auth";

const storagePrefix = 'vadee_';

const storage = {
  // User
  getUser: (): AuthUser | null => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}user`) as string);
  },
  setUser: (user: AuthUser) => {
    window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem(`${storagePrefix}user`);
  },
};

export default storage;
