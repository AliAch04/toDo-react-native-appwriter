import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { database, config } from "@/lib/appwrite";
import TestComponent from "./TestComponent";

interface Task {
  body: string;
  $id: string;
  complete: boolean;
}

interface ListItemProps {
  task: Task;
}

const ListItem = ({ task }: ListItemProps) => {
  const { body, $id, complete } = task;
  const [check, setCheck] = useState(complete);

  const handleUpdate = async () => {
    try {
      await database.updateDocument(config.db, config.col.tasks, $id, { complete: !complete });
      setCheck(!check);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleUpdate} style={styles.itemWrapper}>
      <Checkbox
        value={check}
        onValueChange={handleUpdate}
        color={check ? "#3498db" : "#bdc3c7"} // Blue when checked else gray!
      />
      <TestComponent style={check ? styles.completedText : styles.text} fontSize={18}>
        {body}
      </TestComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ecf0f1",
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: "#2c3e50",
  },
  completedText: {
    color: "#7f8c8d", // Gray color for completed
    textDecorationLine: "line-through",
  },
});

export default ListItem;