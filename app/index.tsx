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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {error && <Text style={styles.errorText}>{JSON.stringify(error)}</Text>}
        <TestComponent style={styles.headline} fontSize={22}>
          ToDo List:
        </TestComponent>
        <FlatList
          data={tasks}
          renderItem={({ item }) => <ListItem task={item} />}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6fa", // Light background color
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headline: {
    paddingVertical: 20,
    color: "#3498db", // Blue color for the headline
  },
  listContainer: {
    paddingBottom: 20,
  },
  errorText: {
    color: "#e74c3c", // Red color for errors
    textAlign: "center",
    marginVertical: 10,
  },
});