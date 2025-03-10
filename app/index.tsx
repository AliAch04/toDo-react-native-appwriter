import { Text, View, SafeAreaView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {config, database} from "@/lib/appwrite"

export default function Index() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    getData()
  }

  const getData = async () => {
    try {
      const {documents, total} = await database.listDocuments(config.db, config.col.tasks)
      setTasks(documents)
      console.log(documents);
      
      
    } catch (error) {
      setError(error)
    }
  }

  return (
    <SafeAreaView>
      {error && (<Text>{JSON.stringify(error)}</Text>)}
      <Text>Todo List: </Text>
      <FlatList 
        data={tasks}
        renderItem={({item}) => <Text>{item.body}</Text>}
      />
    </SafeAreaView>
  );
}
