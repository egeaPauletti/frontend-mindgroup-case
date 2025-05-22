import Header from "@/src/components/Header";
import { Text, View } from "react-native";
import { useAuth } from "../../contexts/auth";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View className="flex items-center justify-center px-10 pt-20">
      <Header />
      <Text>Bem-vindo, {user?.name}!</Text>
    </View>
  );
}
