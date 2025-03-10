import { View, Text, StyleSheet } from "react-native";
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
    <View style={styles.itemWrapper}>
      <Checkbox value={check} onValueChange={handleUpdate} />
      <TestComponent fontSize={18}>{body}</TestComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

export default ListItem;