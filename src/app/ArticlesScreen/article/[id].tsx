import ProfilePhoto from "@/src/components/ProfilePhoto";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

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

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchArticle = async () => {
    try {
      const res = await fetch(`http://192.168.15.90:3000/articles/${id}`);
      if (!res.ok) {
        throw new Error("Erro ao carregar artigo.");
      }
      const data = await res.json();
      setArticle(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o artigo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchArticle();
  }, [id]);

  if (loading || !article) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{ uri: `http://192.168.15.90:3000${article.image}` }}
        style={{ width: "100%", height: 300, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        {article.title}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <ProfilePhoto
          img={`http://192.168.15.90:3000${article.author.imageProfile}`}
          size={30}
        />
        <Text style={{ marginLeft: 8 }}>
          Por <Text style={{ fontWeight: "bold" }}>{article.author.name}</Text>{" "}
          - {new Date(article.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={{ marginTop: 20, fontSize: 16, lineHeight: 24 }}>
        {article.content}
      </Text>
    </ScrollView>
  );
}
