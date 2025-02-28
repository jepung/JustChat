import { supabase } from "../lib/supabase";

export class AuthService {
  static async login(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  static async register(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password,
    });
  }
}
