import { useSetAtom } from "jotai";
import { ReactNode, useEffect } from "react";
import { supabase } from "../lib/supabase";
import sessionAtom from "../store/authStore";
import profileAtom from "../store/profileStore";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setSession = useSetAtom(sessionAtom);
  const setProfile = useSetAtom(profileAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        setProfile(null);
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setProfile(null);
      }
    });
  }, []);

  return children;
};

export default AuthProvider;
