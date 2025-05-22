import Header from "@/src/components/Header";
import ProfilePhoto from "@/src/components/ProfilePhoto";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../contexts/auth";
const { width: screenWidth } = Dimensions.get("window");
interface Author {
  id: number;
  name: string;
  email: string;
  imageProfile: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export default function HomeScreen() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  const getArticles = async () => {
    try {
      const res = await fetch("http://192.168.15.90:3000/articles", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Erro ao buscar artigos:", errorData);
        return;
      }

      const data = await res.json();
      setArticles(data);
      // console.log("Artigos recebidos:", data);
    } catch (error) {
      console.error("Erro de rede:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const lastArticleTitle =
    articles.length > 0 ? articles[articles.length - 1].title : "Carregando...";

  const lastArticleImg =
    articles.length > 0 ? articles[articles.length - 1].image : "Carregando...";
  const lastArticleDate =
    articles.length > 0
      ? articles[articles.length - 1].createdAt
      : "Carregando...";
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingTop: 40,
        width: "100%",
        paddingHorizontal: 10,
      }}
    >
      <Header
        onHomePress={() => router.push("./HomeScreen/")}
        onArtigosPress={() => router.push("./ArticlesScreen/")}
        onOptionSelect={(optionId) =>
          console.log("Selecionou opção:", optionId)
        }
      />

      <View className="w-full justify-between items-center gap-10 p-5 pb-20">
        <View className="w-full flex-col gap-2">
          <Image
            source={{ uri: `http://192.168.15.90:3000${lastArticleImg}` }}
            className="rounded-lg"
            style={{ width: "100%", height: 350 }}
          />
          <Text className="font-bold text-lg">{lastArticleTitle}</Text>
          <View className="flex-row gap-2 items-center">
            <ProfilePhoto
              img={`http://192.168.15.90:3000${user?.imageProfile}`}
              size={30}
            />
            <Text>Por</Text>
            <Text className="font-bold">{user?.name}</Text>
            <Text>-</Text>
            <Text>{new Date(lastArticleDate).toLocaleDateString()}</Text>
          </View>
        </View>
        <View className="w-full flex-col gap-7 bg-[#1B1B1B] p-5 rounded-lg">
          <Text className="text-white font-bold text-3xl">New</Text>
          <View className="flex-col gap-2">
            <Text className="text-white font-bold">
              Inteligência Artificial: O Futuro da Automação e da Transformação
              Digital
            </Text>
            <Text className="text-white">
              Neste artigo, exploramos como a inteligência artificial está
              moldando o futuro dos negócios e da tecno...
            </Text>
          </View>
          <View className="flex-col gap-2">
            <Text className="text-white font-bold">
              Computação Quântica: O Próximo Grande Salto para a Tecnologia
            </Text>
            <Text className="text-white">
              A computação quântica promete revolucionar a maneira como
              processamos informações, superando as limitações dos computadores
              tradicionais. Neste artig...
            </Text>
          </View>
          <View className="flex-col gap-2">
            <Text className="text-white font-bold">
              Como a Internet das Coisas (IoT) Está Moldando o Futuro das
              Cidades Inteligentes
            </Text>
            <Text className="text-white">
              A Internet das Coisas (IoT) é um dos pilares das cidades
              inteligentes, conectando dispositivos do dia a dia à internet para
              coletar e compartilhar dados. Neste artig...
            </Text>
          </View>
          <View className="flex-col gap-2">
            <Text className="text-white font-bold">
              O Impacto da Realidade Virtual e Aumentada no Setor de Educação
            </Text>
            <Text className="text-white">
              A realidade virtual (RV) e aumentada (RA) estão ganhando destaque
              no setor educacional, proporcionando novas maneiras de aprender e
              ensinar.
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal={true} // Ativa o scroll horizontal
          showsHorizontalScrollIndicator={false} // Esconde a barra de scroll (opcional)
          contentContainerStyle={styles.container}
        >
          <View className="flex-row gap-5">
            <View style={{ width: screenWidth / 1.3 }}>
              <Image
                source={{
                  uri: `http://192.168.15.90:3000${lastArticleImg}`,
                }}
                className="rounded-lg"
                style={{ width: "100%", height: 150 }}
              />
              <Text className="font-bold text-base">{lastArticleTitle}</Text>
            </View>
            <View style={{ width: screenWidth / 1.3 }}>
              <Image
                source={{
                  uri: `http://192.168.15.90:3000${lastArticleImg}`,
                }}
                className="rounded-lg"
                style={{ width: "100%", height: 150 }}
              />
              <Text className="font-bold text-base">{lastArticleTitle}</Text>
            </View>
            <View style={{ width: screenWidth / 1.3 }}>
              <Image
                source={{
                  uri: `http://192.168.15.90:3000${lastArticleImg}`,
                }}
                className="rounded-lg"
                style={{ width: "100%", height: 150 }}
              />
              <Text className="font-bold text-base">{lastArticleTitle}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  box: {
    width: 150,
    height: 150,
    marginRight: 15,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
