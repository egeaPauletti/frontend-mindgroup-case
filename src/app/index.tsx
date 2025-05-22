import { StyleSheet, View } from "react-native";
import "../styles/global.css";
import LoginScreen from "./LoginScreen/index";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
});
