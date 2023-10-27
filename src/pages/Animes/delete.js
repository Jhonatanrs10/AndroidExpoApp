import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from './data';

export function Delete({closeWindow}) {

  async function deleteAllData(){

    await AsyncStorage.removeItem("@JhonatanrsAndroidExpoApp:Animes");
    actions.showMsg('Database Deletada.')
    closeWindow();
  }
  
 return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Are you sure you want to delete all the data?</Text>
    
    <View style={styles.container2}>

      <TouchableOpacity activeOpacity={0.3} style={styles.buttonStyle} onPress={deleteAllData}>
        <Text style={styles.buttonText}>Yes, I'm sure!</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.3} style={styles.buttonStyle} onPress={closeWindow}>
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0C4DE',
    justifyContent: 'center',
    textAlign: 'center',
    paddingStart: '10%',
    paddingEnd: '10%'
  },
  titulo:{
    margin:10,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },  
  input:{  
    textAlign: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 10,
},
  buttonText:{
    paddingTop: 5,
    color: '#000',
    paddingBottom: 5,
    padding: 10
  }
})