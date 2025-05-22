import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Text, View } from "react-native";

const ToatsNotigation = () => {
  return (
    <View className="flex flex-row justify-center items-center gap-2 w-full bg-[#FF3B30] py-2 rounded-lg absolute top-2 ">
      <MaterialIcons name="info" size={30} color="#fff" />
      <View className="flex flex-col">
        <Text className="text-white">Email ou senha incorretos.</Text>
      </View>
    </View>
  );
};
export default ToatsNotigation;
