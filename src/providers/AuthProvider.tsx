import { ReactNode, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useSetAtom } from "jotai";
import { sessionAtom } from "../store/authStore";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setSession = useSetAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return children;
};

export default AuthProvider;
