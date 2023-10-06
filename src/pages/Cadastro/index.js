import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Cadastro({closeWindow}) {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [release, setRelease] = useState("");
  const [episode, setEpisode] = useState("");

  async function salvarNew(){
    try{

      const newData = {
        id,
        name,
        status,
        release,
        episode
      }
  
      const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
      const previousData = response ? JSON.parse(response) : [];
      const data = [...previousData, newData];

      await AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes",JSON.stringify(data));

      alert("Salvo com Sucesso.");

      closeWindow();

    }catch(error){

      console.log(error);
      alert("Não foi possível cadastrar");

    }
    
  }

 return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Cadastro</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      <TextInput style={styles.input} placeholder="Id" onChangeText={setId}/>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName}/>
      <TextInput style={styles.input} placeholder="Status" onChangeText={setStatus}/>
      <TextInput style={styles.input} placeholder="Release" onChangeText={setRelease}/>
      <TextInput style={styles.input} placeholder="Episode" onChangeText={setEpisode}/>
    </ScrollView>
    
    <View style={styles.container2}>

      <TouchableOpacity activeOpacity={0.3} style={styles.buttonStyle} onPress={salvarNew}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.3} style={styles.buttonStyle} onPress={closeWindow}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
   
  },
  titulo:{
    margin:10,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },  
  input:{  
    textAlign: 'center',
    backgroundColor: '#B0C4DE',
    marginBottom: 10,
    marginStart: '10%',
    marginEnd: '10%',
    padding: 10,
    borderRadius: 10
  },
  container2:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
},
  buttonStyle:{
    padding:5,
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
},
  buttonText:{
    paddingTop: 5,
    color: '#000',
    paddingBottom: 5,
    padding: 10
  }
})