import { supabase } from "../lib/supabase";

export class ProfileService {
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
