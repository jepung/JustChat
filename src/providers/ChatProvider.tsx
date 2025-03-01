import { useAtomValue } from "jotai";
import React, { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import StreamService from "../services/stream.service";
import profileAtom from "../store/profileStore";

const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const profile = useAtomValue(profileAtom);

  const connectUser = async () => {
    try {
      const client = await StreamService.connectUser(profile!);
      setChatClient(client);
    } catch (e) {
      if (e instanceof Error) {
        return Alert.alert("Error", e.message);
      }
    }
  };

  const disconnectUser = async () => {
    try {
      await StreamService.disconnectUser();
    } catch (e) {
      if (e instanceof Error) {
        return Alert.alert("Error", e.message);
      }
    }
  };

  useEffect(() => {
    if (profile) {
      connectUser();
    }
  }, [profile]);

  if (!chatClient) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={18} />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
