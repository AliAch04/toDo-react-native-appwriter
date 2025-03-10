import { Text, StyleProp, TextStyle, StyleSheet } from "react-native";
import React from "react";

interface TestComponentProps {
  style?: StyleProp<TextStyle>;
  fontSize?: number;
  children: React.ReactNode;
}

const TestComponent = ({ style, fontSize = 16, children }: TestComponentProps) => {
  return <Text style={[styles.text, style, { fontSize }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "#2c3e50", // Dark blue-gray color
  },
});

export default TestComponent;