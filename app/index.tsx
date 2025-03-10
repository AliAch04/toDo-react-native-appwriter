import { Text, View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { config, database } from "@/lib/appwrite";
import ListItem from "./components/ListItem";
import TestComponent from "./components/TestComponent";

export default function Index() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { documents } = await database.listDocuments(config.db, config.col.tasks);
      setTasks(documents);
      console.log(documents);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {error && <Text>{JSON.stringify(error)}</Text>}
        <TestComponent style={styles.headline} fontSize={22}>
          ToDo List:
        </TestComponent>
        <FlatList
          data={tasks}
          renderItem={({ item }) => <ListItem task={item} />}
          keyExtractor={(item) => item.$id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headline: {
    paddingVertical: 20,
  },
});