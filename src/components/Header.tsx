import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "../contexts/auth";
import ProfilePhoto from "./ProfilePhoto";
export default function Header() {
  const { user } = useAuth();

  const router = useRouter();
  return (
    <View className="flex-row w-full justify-between items-center mb-5 px-5">
      <View className="flex-row gap-10">
        <Pressable onPress={() => router.push("./HomeScreen/")}>
          <Text className="text-[#1B1B1B]">Home</Text>
        </Pressable>
        <Pressable onPress={() => router.push("./ArticlesScreen/")}>
          <Text className="text-[#1B1B1B]">Artigos</Text>
        </Pressable>
      </View>
      <ProfilePhoto
        img={`http://192.168.15.90:3000${user?.imageProfile}`}
        size={40}
      />
    </View>
  );
}
