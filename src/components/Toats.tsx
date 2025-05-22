import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Text, View } from "react-native";

interface ToastProps {
  text: string;
}

const ToatsNotigation: React.FC<ToastProps> = ({ text }) => {
  return (
    <View className="flex flex-row justify-center items-center gap-2 w-full bg-[#FF3B30] py-2 rounded-lg absolute top-[6%] ">
      <MaterialIcons name="info" size={30} color="#fff" />
      <View className="flex flex-col">
        <Text className="text-white">{text}</Text>
      </View>
    </View>
  );
};
export default ToatsNotigation;
