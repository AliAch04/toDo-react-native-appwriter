import {Client, Databases} from 'react-native-appwrite'
import {Platform} from 'react-native';

const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId : '67cc64600020c6eea424',
    db: '67cc648200298fda99d6',
    col:{
        tasks: '67cc6491003d6ae4a88d'
    }
}

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)

switch(Platform.OS){
    case 'android':
        client.setPlatform("com.ali.todo");
        break
    // case 'ios':
}

const database = new Databases(client)

export {database, config, client}
    