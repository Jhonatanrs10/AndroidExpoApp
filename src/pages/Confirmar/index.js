import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from '../Actions';

export function Confirmar({closeWindow}) {

  async function deleteAllData(){

    await AsyncStorage.removeItem("@JhonatanrsAndroidExpoApp:Animes");
  
    alert("Database DELETADO");

    closeWindow();
  }

  function tapSim(action){
    action
    closeWindow();
  }
  
 return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Tem certeza sobre essa ação?</Text>
    
    <View style={styles.container2}>

      <TouchableOpacity activeOpacity={0.3} style={styles.buttonStyle} onPress={deleteAllData}>
        <Text style={styles.buttonText}>Sim</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.3} style={styles.buttonStyle} onPress={closeWindow}>
        <Text style={styles.buttonText}>Não</Text>
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
    justifyContent: 'center',
    textAlign: 'center',
   
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