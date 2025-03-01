import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { IProfile } from "../store/profileStore";

export class ProfileService {
  static async getProfile(session: Session) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session!.user.id)
      .single();
    return {
      data: data as IProfile | null,
    };
  }

  static async uploadAvatar(avatar: any, placeHolderUri: string) {
    const imageBuffer = await fetch(avatar?.uri ?? placeHolderUri).then(
      (data) => data.arrayBuffer()
    );
    const imageExt = avatar?.uri.split(".").pop()?.toLowerCase() ?? "jpeg";

    return supabase.storage
      .from("avatars")
      .upload(`${Date.now()}.${imageExt}`, imageBuffer, {
        contentType: avatar?.mimeType ?? "image/jpeg",
      });
  }

  static async completeProfile(data: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    email: string;
    updated_at: Date;
  }) {
    return supabase.from("profiles").upsert(data);
  }
}
