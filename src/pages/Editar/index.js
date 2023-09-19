import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export function Editar({closeWindow, value}) {

 return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Editar</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      <TextInput style={styles.input} placeholder="Name" value={value}/>
      <TextInput style={styles.input} placeholder="Status"/>
      <TextInput style={styles.input} placeholder="Release"/>
      <TextInput style={styles.input} placeholder="Episode"/>
    </ScrollView>
    
    <View style={styles.container2}>

      <TouchableOpacity activeOpacity={0.3} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Atualizar</Text>
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
    margin:20,
    marginTop:70,
    marginBottom:150,
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