import Header from "@/src/components/Header";
import ProfilePhoto from "@/src/components/ProfilePhoto";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useAuth } from "../../contexts/auth";

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

export default function ArticlesScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetch("http://192.168.15.90:3000/articles");
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Erro ao buscar artigos:", errorData);
          return;
        }
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Erro de rede:", error);
        Alert.alert("Erro", "Não foi possível conectar ao servidor.");
      }
    };

    getArticles();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingTop: 40,
        width: "100%",
        paddingHorizontal: 10,
      }}
    >
      <Header />

      <View style={{ width: "100%" }}>
        {articles.map((article) => (
          <Link
            key={article.id}
            href={{
              pathname: "/ArticlesScreen/article/[id]",
              params: { id: article.id.toString() },
            }}
            asChild
          >
            <Pressable style={{ marginBottom: 24 }}>
              <View className="w-full flex-col gap-2">
                <Image
                  source={{ uri: `http://192.168.15.90:3000${article.image}` }}
                  style={{ width: "100%", height: 350, borderRadius: 10 }}
                />
                <Text className="font-bold text-lg">{article.title}</Text>
                <Text className="text-lg h-40">{article.content}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  <ProfilePhoto
                    img={`http://192.168.15.90:3000${article.author.imageProfile}`}
                    size={30}
                  />
                  <Text>Por</Text>
                  <Text className="font-bold">{article.author.name}</Text>
                  <Text>-</Text>
                  <Text>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
