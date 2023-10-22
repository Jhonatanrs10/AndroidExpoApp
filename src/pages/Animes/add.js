import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'//https://github.com/bhrott/react-native-masked-text

export function Cadastro({ closeWindow, idEdit }) {

  console.log("ola" + idEdit)

  const [titleBar, setTitleBar] = useState("New Anime");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Watching");
  const [release, setRelease] = useState("Monday");
  const [obs, setObs] = useState("");
  const [linkAssistir, setlinkAssistir] = useState("");
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
    if (status == "Watching") {
      setStatus("Completed")
    } else {
      setStatus("Watching")
    }
  }

  const changeRelease = () => {
    if (release == "Monday") {
      setRelease("Tuesday")
    } else if (release == "Tuesday") {
      setRelease("Wednesday")
    } else if (release == "Wednesday") {
      setRelease("Thursday")
    } else if (release == "Thursday") {
      setRelease("Friday")
    } else if (release == "Friday") {
      setRelease("Saturday")
    } else if (release == "Saturday") {
      setRelease("Sunday")
    } else if (release == "Sunday") {
      setRelease("Monday")
    } else {
      setRelease("Monday")
    }
  }

  async function salvarNew() {
    const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
    const data = response ? JSON.parse(response) : [];
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      count = data[i].id
    }
    const nextId = count + 1

    try {

      if (name == "" || season01 == "") {
        alert("Name and Season are required");
      } else if (name.indexOf(",") != -1 == true || name.indexOf(";") != -1 == true || obs.indexOf(";") != -1 == true || obs.indexOf(";") != -1 == true || linkAssistir.indexOf(";") != -1 == true || linkAssistir.indexOf(";") != -1 == true) {
        alert("Name, Obs and Link cannot have the characters (,) and (;) ");
      } else {
        const newData = {
          id: nextId,
          name,
          status,
          release,
          obs,
          linkAssistir,
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
        //console.log(response)//string
        const previousData = response ? JSON.parse(response) : [];
        //console.log(previousData)//json array
        const data = [...previousData, newData];
        //console.log(newData)//new in array
        //console.log(data)


        await AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes", JSON.stringify(data));//json string convert array para string

        alert("Salvo com Sucesso.");
        console.log("resultado ADD" + JSON.stringify(data))

        closeWindow();
      }


    } catch (error) {

      console.log(error);
      alert("Não foi possível cadastrar");

    }

  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="default"
      />
      <View style={styles.window}>
        <View style={styles.bar}>
          <Text style={styles.textBar}>{titleBar}</Text>
        </View>
        <View style={styles.form}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput style={styles.input} placeholder="Name" onChangeText={setName} />
            <TouchableOpacity activeOpacity={0.3} style={styles.input} onPress={changeStatus}>
              <Text style={styles.center}>Status: {status}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={styles.input} onPress={changeRelease}>
              <Text style={styles.center}>Release: {release}</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="Obs" onChangeText={setObs} />
            <TextInput style={styles.input} placeholder="Link" onChangeText={setlinkAssistir} />
            <View style={styles.seasons}>
              <View style={styles.seasons2}>
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 01" type={'custom'} options={{ mask: '99999' }} value={season01} onChangeText={setSeason01} />
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 02" type={'custom'} options={{ mask: '99999' }} value={season02} onChangeText={setSeason02} />
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 03" type={'custom'} options={{ mask: '99999' }} value={season03} onChangeText={setSeason03} />
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 04" type={'custom'} options={{ mask: '99999' }} value={season04} onChangeText={setSeason04} />
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 05" type={'custom'} options={{ mask: '99999' }} value={season05} onChangeText={setSeason05} />
              </View>
              <View style={styles.seasons2}>
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 06" type={'custom'} options={{ mask: '99999' }} value={season06} onChangeText={setSeason06} />
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 07" type={'custom'} options={{ mask: '99999' }} value={season07} onChangeText={setSeason07} />
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 08" type={'custom'} options={{ mask: '99999' }} value={season08} onChangeText={setSeason08} />
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 09" type={'custom'} options={{ mask: '99999' }} value={season09} onChangeText={setSeason09} />
                <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Season 10" type={'custom'} options={{ mask: '99999' }} value={season10} onChangeText={setSeason10} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={salvarNew}>
          <AntDesign name="save" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={closeWindow}>
          <AntDesign name="back" size={30} color="#808080" />
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
  window: {
    flex: 1,
    margin: 15,
    borderRadius: 11,
    borderColor: 'black',
    paddingBottom: 1,
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  buttonsBar: {
    padding: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 7,
    height: 17,
    width: 17,
  },
  textBar: {
    fontWeight: "bold"
  },
  bar: {
    height: 25,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: '#B0C4DE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 1,
  },
  form: {
    margin: '10%'
  },
  seasons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginStart: '10%',
    marginEnd: '10%'
  },
  seasons2: {
    flexDirection: 'column',
    width: '62.5%'
  },
  center: {
    textAlign: 'center'
  },
  titulo: {
    margin: 10,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
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
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  buttonStyle: {
    padding: 5,
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
  },
  buttonText: {
    paddingTop: 5,
    color: '#000',
    paddingBottom: 5,
    padding: 10
  },
  containerDock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 70,
    marginBottom: 15,
    marginStart: 15,
    marginEnd: 15,
    borderRadius: 15,
    backgroundColor: '#B0C4DE',
    alignItems: 'center',
  },
  buttonsDock: {
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 13,
    height: 40,
    width: 40,
  }
})