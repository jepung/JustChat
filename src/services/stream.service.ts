import { StreamChat } from "stream-chat";
import { IProfile } from "../store/profileStore";


export default class StreamService  {
    static _client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY)

    static async #generateUserToken(profile: IProfile): Promise<string> {
       const res = await fetch(
            "https://wgzqwiavkiisultllrgo.supabase.co/functions/v1/generate-token",
            {
                method: "POST",
                body: JSON.stringify({
                userId: profile.id,
                }),
            }
        )
        const data = await res.json()
        return data.token as string
    }

    static async connectUser(profile: IProfile) {
       try {
        const userToken = await this.#generateUserToken(profile)

        await this._client.connectUser(
            {
              id: profile!.id,
              name: profile!.full_name,
              username: profile!.username,
            },
            userToken
          );

        return this._client
       }catch(e){
        throw e
       }
    }
    
    static async disconnectUser() {
       try {
        await this._client.disconnectUser()
       }catch(e){
        throw e
       }
    }
}