import { useSetAtom } from "jotai";
import { ReactNode, useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import StreamService from "../services/stream.service";
import sessionAtom from "../store/authStore";
import profileAtom from "../store/profileStore";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setSession = useSetAtom(sessionAtom);
  const setProfile = useSetAtom(profileAtom);

  const resetAuth = async () => {
    try {
      setProfile(null);
      StreamService.disconnectUser();
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert("Failed", e.message);
      }
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        resetAuth();
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        resetAuth();
      }
    });
  }, []);

  return children;
};

export default AuthProvider;
