import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
export default function ForgotPassword() {
  const router = useRouter();
  return (
    <View className="flex flex-col items-center gap-14 pt-20 px-10">
      <View className="flex flex-col gap-5">
        <View className="flex flex-row gap-2">
          <Pressable onPress={() => router.push("./LoginScreen/")}>
            <MaterialIcons name="arrow-back" size={30} color="#000" />
          </Pressable>
          <Text className="text-3xl font-bold">Esqueci a senha</Text>
        </View>
        <Text className="text-base">
          Sem problemas! Informe seu e-mail e enviaremos um link para redefinir
          sua senha.
        </Text>
      </View>
      <View className="flex felx-col justify-center items-center w-full gap-5">
        <View className="flex flex-col gap-5 w-full">
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            className=" border border-[#9E9E9E] border-solid p-2 rounded-md h-14"
          />
          <TextInput
            placeholder="Nova senha"
            autoCapitalize="none"
            secureTextEntry
            className="border border-[#9E9E9E] border-solid p-2 rounded-md h-14"
          />
          <TextInput
            placeholder="Confirmar nova senha"
            autoCapitalize="none"
            secureTextEntry
            className="border border-[#9E9E9E] border-solid p-2 rounded-md h-14"
          />
        </View>

        <View className="flex gap-5 w-full justify-center items-center">
          <Pressable className="flex items-center justify-center w-full h-14 bg-[#18181B] rounded-2xl">
            <Text className="text-white">Alterar</Text>
          </Pressable>
          <Pressable onPress={() => router.push("./RegisterScreen/")}>
            <Text className="text-sm">Novo usuário? Clique aqui</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
