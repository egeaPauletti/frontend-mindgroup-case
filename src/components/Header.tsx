import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../contexts/auth";
import ProfilePhoto from "./ProfilePhoto";
const options = [
  { id: "perfil", label: "Perfil" },
  { id: "meusArtigos", label: "Meus artigos" },
  { id: "criarNovo", label: "Criar novo artigo" },
];

interface HeaderProps {
  onHomePress?: () => void;
  onArtigosPress?: () => void;
  onOptionSelect?: (optionId: string) => void;
}

export default function Header({
  onHomePress,
  onArtigosPress,
  onOptionSelect,
}: HeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();
  const handleOptionPress = (optionId: string) => {
    setModalVisible(false);
    if (onOptionSelect) {
      onOptionSelect(optionId);
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Botões Home e Artigos */}
      <View className="flex-row gap-5">
        <Pressable onPress={onHomePress} style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>

        <Pressable onPress={onArtigosPress} style={styles.button}>
          <Text style={styles.buttonText}>Artigos</Text>
        </Pressable>
      </View>

      {/* Botão Menu com imagem */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.menuButton}
      >
        <ProfilePhoto
          img={`http://192.168.15.90:3000${user?.imageProfile}`}
          size={40}
        />
      </Pressable>

      {/* Modal do menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Botão fechar X */}
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>

            {/* Lista de opções */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.optionButton}
                  onPress={() => handleOptionPress(item.id)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 14,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    height: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
  },
  optionButton: {
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 16,
    alignSelf: "flex-end",
  },
  separator: {
    height: 0,
    backgroundColor: "#eee",
  },
});
