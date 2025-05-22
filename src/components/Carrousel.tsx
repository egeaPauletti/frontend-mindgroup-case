import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

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

export default function ArticleCarousel() {
  const [articles, setArticles] = useState<Article[]>([]);

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
    } catch (error) {
      console.error("Erro de rede:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (articles.length === 0) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Carregando artigos...
      </Text>
    );
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <Carousel
        width={screenWidth}
        height={300}
        data={articles}
        scrollAnimationDuration={500}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 15,
              marginHorizontal: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Image
              source={{ uri: `http://192.168.15.90:3000${item.image}` }}
              style={{ width: "100%", height: 150, borderRadius: 8 }}
              resizeMode="cover"
            />
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text style={{ marginTop: 5 }} numberOfLines={2}>
              {item.content}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
