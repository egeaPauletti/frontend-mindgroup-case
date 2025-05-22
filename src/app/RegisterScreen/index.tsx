import Checkbox from "@/src/components/CheckBox";
import ToatsNotigation from "@/src/components/Toats";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
export default function RegisterScreen() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkedBox, setCheckedBox] = useState<boolean>(false);
  const [toast, setToast] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://192.168.15.90:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        setToast(!toast);

        setTimeout(() => {
          setToast(toast);
        }, 2000);
        return;
      }
      setTimeout(() => {
        router.push("./LoginScreen/");
      }, 2000);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };
  return (
    <View className="flex flex-col items-center gap-14 pt-20 px-10">
      {toast && <ToatsNotigation text="Email já cadastrado" />}
      <View className="flex flex-col gap-5">
        <View className="flex flex-row gap-2">
          <Pressable onPress={() => router.push("./LoginScreen/")}>
            <MaterialIcons name="arrow-back" size={30} color="#000" />
          </Pressable>
          <Text className="text-3xl font-bold">Registrar</Text>
        </View>
        <Text className="text-base">
          Crie sua conta para explorar conteúdos incríveis, seguir autores e
          participar da comunidade.
        </Text>
      </View>
      <View className="flex felx-col justify-center items-center w-full gap-5">
        <View className="flex flex-col gap-5 w-full">
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoComplete="name"
            className=" border border-[#9E9E9E] border-solid p-2 rounded-md h-14"
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            className=" border border-[#9E9E9E] border-solid p-2 rounded-md h-14"
          />
          <TextInput
            placeholder="Senha"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="border border-[#9E9E9E] border-solid p-2 rounded-md h-14"
          />
          <TextInput
            placeholder="Confirmar senha"
            autoCapitalize="none"
            secureTextEntry
            // value={password}
            // onChangeText={setPassword}
            className="border border-[#9E9E9E] border-solid p-2 rounded-md h-14"
          />
        </View>

        <View className="flex gap-5 w-full justify-center items-center">
          <Pressable
            onPress={handleSubmit}
            className={`flex items-center justify-center w-full h-14 rounded-2xl ${
              checkedBox ? "bg-[#18181B]" : "bg-[#36363b]"
            }`}
            disabled={!checkedBox}
          >
            <Text className="text-white">Criar conta</Text>
          </Pressable>
          <View className="w-full px-10">
            <Checkbox
              label="Li e concordo com os Termos de Uso e a Política de Privacidade."
              onChange={() => setCheckedBox(!checkedBox)}
            />
          </View>
          <Pressable onPress={() => router.push("./LoginScreen/")}>
            <Text className="text-sm">Ja tem cadastro? Clique aqui</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
