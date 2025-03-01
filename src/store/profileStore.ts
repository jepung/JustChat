import { atom } from "jotai";

export interface IProfile {
  id: string;
  full_name: string;
  email: string;
  username: string;
  avatar_url: string;
}

const profileAtom = atom<IProfile | null>(null);

export default profileAtom;
