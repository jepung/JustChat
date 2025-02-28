import { Session } from "@supabase/supabase-js";
import { atom } from "jotai";

const sessionAtom = atom<Session | null>(null);

export { sessionAtom };
