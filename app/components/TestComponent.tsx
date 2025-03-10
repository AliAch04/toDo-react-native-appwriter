import { Text, StyleProp, TextStyle } from "react-native";
import React from "react";

interface TestComponentProps {
  style?: StyleProp<TextStyle>;
  fontSize?: number;
  children: React.ReactNode;
}

const TestComponent = ({ style, fontSize = 16, children }: TestComponentProps) => {
  return <Text style={[style, { fontSize }]}>{children}</Text>;
};

export default TestComponent;