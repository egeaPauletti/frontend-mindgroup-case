import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <Pressable
      onPress={toggleCheckbox}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <View
        style={{
          width: 15,
          height: 15,
          borderWidth: 1,
          borderColor: "#9E9E9E",
          marginRight: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {checked && <MaterialIcons name="close" size={13} color="#9E9E9E" />}
      </View>
      <Text className="text-sm">{label}</Text>
    </Pressable>
  );
};

export default Checkbox;
