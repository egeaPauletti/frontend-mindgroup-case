import { ScrollView } from "react-native";
import Header from "../../components/Header";

export default function ArticlesScreen() {
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
    </ScrollView>
  );
}
