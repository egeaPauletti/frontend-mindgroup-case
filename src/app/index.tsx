import { StatusBar, StyleSheet, View } from "react-native";

export default function App() {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
});
//
