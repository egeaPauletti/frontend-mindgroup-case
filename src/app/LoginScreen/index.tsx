import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import ToatsNotigation from "../../components/Toats";
import { useAuth } from "../../contexts/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toast, setToast] = useState(false);
  const router = useRouter();

  const { handleLogin } = useAuth();

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://192.168.15.90:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast(true);

        setTimeout(() => {
          setToast(false);
        }, 2000);
        return;
      }

      // console.log("Usuário após login:", data.user);
      handleLogin(data.user);

      setTimeout(async () => {
        // await AsyncStorage.setItem("token", data.token);
        router.push("./HomeScreen/");
      }, 2000);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <View className="flex flex-col items-center gap-14 pt-20 px-10">
      {toast && <ToatsNotigation text="Email ou senha incorretos." />}
      <View className="flex flex-col gap-2">
        <Text className="text-3xl font-bold">Bem-Vindo de Volta!</Text>
        <Text className="text-base">
          Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito
          mais.
        </Text>
      </View>
      <View className="flex felx-col justify-center items-center w-full gap-5">
        <View className="flex flex-col gap-5 w-full">
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
          <Pressable
            className="flex items-end justify-end"
            onPress={() => router.push("./ForgotPassword/")}
          >
            <Text className="text-sm">Esqueceu a senha?</Text>
          </Pressable>
        </View>
        <View className="flex gap-5 w-full justify-center items-center">
          <Pressable
            onPress={handleSubmit}
            className="flex items-center justify-center w-full h-14 bg-[#18181B] rounded-2xl"
          >
            <Text className="text-white">Login</Text>
          </Pressable>
          <Pressable onPress={() => router.push("./RegisterScreen/")}>
            <Text className="text-sm">Novo usuário? Clique aqui</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
