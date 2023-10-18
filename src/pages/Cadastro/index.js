import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Cadastro({closeWindow}) {


  const [name, setName] = useState("");
  const [status, setStatus] = useState("Watching");
  const [release, setRelease] = useState("Monday");
  const [season01, setSeason01] = useState("");
  const [season02, setSeason02] = useState("");
  const [season03, setSeason03] = useState("");
  const [season04, setSeason04] = useState("");
  const [season05, setSeason05] = useState("");
  const [season06, setSeason06] = useState("");
  const [season07, setSeason07] = useState("");
  const [season08, setSeason08] = useState("");
  const [season09, setSeason09] = useState("");
  const [season10, setSeason10] = useState("");

  const changeStatus = () => {
    if(status == "Watching")
      setStatus("Completed")
    else
      setStatus("Watching")
  }

  const changeRelease = () => {
    if(release == "Monday")
      setRelease("Tuesday")
    if(release == "Tuesday")
      setRelease("Wednesday")
    if(release == "Wednesday")
      setRelease("Thursday")
    if(release == "Thursday")
      setRelease("Friday")
    if(release == "Friday")
      setRelease("Saturday")
    if(release == "Saturday")
      setRelease("Sunday")
    if(release == "Sunday")
      setRelease("Monday")
    else
      setRelease("Monday")
  }

  async function salvarNew(){
    const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
    const data = response ? JSON.parse(response) : [];
    const nextId = data.length + 1
    try{

      const newData = {
        id: nextId,
        name,
        status,
        release,
        season01,
        season02,
        season03,
        season04,
        season05,
        season06,
        season07,
        season08,
        season09,
        season10
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
    
    <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName}/>
      <TouchableOpacity activeOpacity={0.3} style={styles.input} onPress={changeStatus}>
        <Text style={styles.center}>Status: {status}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.3} style={styles.input} onPress={changeRelease}>
        <Text style={styles.center}>Release: {release}</Text>
      </TouchableOpacity>
      <View style={styles.seasons}>
        <View style={styles.seasons2}>
          <TextInput style={styles.input} placeholder="Season 01" onChangeText={setSeason01}/>
          <TextInput style={styles.input} placeholder="Season 02" onChangeText={setSeason02}/>
          <TextInput style={styles.input} placeholder="Season 03" onChangeText={setSeason03}/>
          <TextInput style={styles.input} placeholder="Season 04" onChangeText={setSeason04}/>
          <TextInput style={styles.input} placeholder="Season 05" onChangeText={setSeason05}/>
        </View>
        <View style={styles.seasons2}>
          <TextInput style={styles.input} placeholder="Season 06" onChangeText={setSeason06}/>
          <TextInput style={styles.input} placeholder="Season 07" onChangeText={setSeason07}/>
          <TextInput style={styles.input} placeholder="Season 08" onChangeText={setSeason08}/>
          <TextInput style={styles.input} placeholder="Season 09" onChangeText={setSeason09}/>
          <TextInput style={styles.input} placeholder="Season 10" onChangeText={setSeason10}/>
        </View>
      </View>
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
  form:{
    
  },
  seasons:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginStart: '10%',
    marginEnd: '10%'
  },
  seasons2:{
    flexDirection: 'column',
    width: '62.5%'
  },
  center:{
    textAlign: 'center'
  },
  titulo:{
    margin:10,
    padding:10,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },  
  input:{  
    textAlign: 'center',
    backgroundColor: '#B0C4DE',
    marginTop: 5,
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
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