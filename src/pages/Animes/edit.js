import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'//https://github.com/bhrott/react-native-masked-text
import actions from './data';


export function CadastroEdit({ closeWindow, item }) {


  const [nameEdit, setName] = useState(item.name);
  const [statusEdit, setStatus] = useState(item.status);
  const [releaseEdit, setRelease] = useState(item.release);
  const [obsEdit, setObs] = useState(item.obs);
  const [linkWEdit, setlinkW] = useState(item.linkW);
  const [season01Edit, setSeason01] = useState(item.season01);
  const [season02Edit, setSeason02] = useState(item.season02);
  const [season03Edit, setSeason03] = useState(item.season03);
  const [season04Edit, setSeason04] = useState(item.season04);
  const [season05Edit, setSeason05] = useState(item.season05);
  const [season06Edit, setSeason06] = useState(item.season06);
  const [season07Edit, setSeason07] = useState(item.season07);
  const [season08Edit, setSeason08] = useState(item.season08);
  const [season09Edit, setSeason09] = useState(item.season09);
  const [season10Edit, setSeason10] = useState(item.season10);

  const changeStatus = () => {
    if (statusEdit == "Watching") {
      setStatus("Completed")
    } else {
      setStatus("Watching")
    }
  }

  const changeRelease = () => {
    if (releaseEdit == "1-Monday") {
      setRelease("2-Tuesday")
    } else if (releaseEdit == "2-Tuesday") {
      setRelease("3-Wednesday")
    } else if (releaseEdit == "3-Wednesday") {
      setRelease("4-Thursday")
    } else if (releaseEdit == "4-Thursday") {
      setRelease("5-Friday")
    } else if (releaseEdit == "5-Friday") {
      setRelease("6-Saturday")
    } else if (releaseEdit == "6-Saturday") {
      setRelease("7-Sunday")
    } else if (releaseEdit == "7-Sunday") {
      setRelease("1-Monday")
    } else {
      setRelease("1-Monday")
    }
  }

  function deleteEdit() {
    Alert.alert('Delete', 'Are you sure about this choice?', [
      { text: "Yes,I'm sure!", onPress: () => deleteIdData(item.id) },
      { text: 'No', style: 'cancel', },]);
    
  }
  function addEdit() {
    editIdData(item.id)
    actions.showMsg('Editado com sucesso.')
  }

  async function deleteIdData(valueId) {
    const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
    const data = response ? JSON.parse(response) : [];
    var animeAllData = [];

    for (var i = 0; i < data.length; i++) {
      if (valueId == data[i].id) {
        actions.showMsg('Excluido com Sucesso.')
      } else {
        const id = (data[i].id);
        const name = (data[i].name);
        const status = (data[i].status);
        const release = (data[i].release);
        const obs = (data[i].obs);
        const linkW = (data[i].linkW);
        const season01 = (data[i].season01);
        const season02 = (data[i].season02);
        const season03 = (data[i].season03);
        const season04 = (data[i].season04);
        const season05 = (data[i].season05);
        const season06 = (data[i].season06);
        const season07 = (data[i].season07);
        const season08 = (data[i].season08);
        const season09 = (data[i].season09);
        const season10 = (data[i].season10);

        const animeData = {
          id,
          name,
          status,
          release,
          obs,
          linkW,
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
        animeAllData.push(animeData)
      }
    }

    //console.log(JSON.stringify(animeAllData))

    AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes", JSON.stringify(animeAllData));

    closeWindow();

  }


  async function editIdData(valueId) {
    //console.log(nameEdit)
    const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
    const data = response ? JSON.parse(response) : [];
    var animeAllData = [];

    for (var i = 0; i < data.length; i++) {
      if (valueId == data[i].id) {
        //console.log(valueId)
        const id = (data[i].id);
        const name = (nameEdit);
        const status = (statusEdit);
        const release = (releaseEdit);
        const obs = (obsEdit);
        const linkW = (linkWEdit);
        const season01 = (season01Edit);
        const season02 = (season02Edit);
        const season03 = (season03Edit);
        const season04 = (season04Edit);
        const season05 = (season05Edit);
        const season06 = (season06Edit);
        const season07 = (season07Edit);
        const season08 = (season08Edit);
        const season09 = (season09Edit);
        const season10 = (season10Edit);

        const animeData = {
          id,
          name,
          status,
          release,
          obs,
          linkW,
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
        animeAllData.push(animeData)
      } else {
        const id = (data[i].id);
        const name = (data[i].name);
        const status = (data[i].status);
        const release = (data[i].release);
        const obs = (data[i].obs);
        const linkW = (data[i].linkW);
        const season01 = (data[i].season01);
        const season02 = (data[i].season02);
        const season03 = (data[i].season03);
        const season04 = (data[i].season04);
        const season05 = (data[i].season05);
        const season06 = (data[i].season06);
        const season07 = (data[i].season07);
        const season08 = (data[i].season08);
        const season09 = (data[i].season09);
        const season10 = (data[i].season10);

        const animeData = {
          id,
          name,
          status,
          release,
          obs,
          linkW,
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
        animeAllData.push(animeData)
      }
    }

    //console.log(JSON.stringify(animeAllData))

    AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes", JSON.stringify(animeAllData));

    closeWindow();

  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="default"
      />
      <View style={styles.window}>
        <View style={styles.bar}>
          <Text style={styles.textBar}>Edit Anime (ID:{item.id})</Text>
        </View>
        <View style={styles.form}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput style={styles.input} placeholder="Name" value={nameEdit} onChangeText={setName} />
            <TouchableOpacity activeOpacity={0.3} style={styles.input} onPress={changeStatus}>
              <Text style={styles.center}>Status: {statusEdit}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={styles.input} onPress={changeRelease}>
              <Text style={styles.center}>Release: {releaseEdit.substring(2)}</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="Obs" value={obsEdit} onChangeText={setObs} />
            <TextInput style={styles.input} placeholder="Link" value={linkWEdit} onChangeText={setlinkW} />
            <View style={styles.seasons}>
              <View style={styles.seasons2}>
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 01" type={'custom'} options={{ mask: '99999' }} value={season01Edit} onChangeText={setSeason01} />
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 02" type={'custom'} options={{ mask: '99999' }} value={season02Edit} onChangeText={setSeason02} />
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 03" type={'custom'} options={{ mask: '99999' }} value={season03Edit} onChangeText={setSeason03} />
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 04" type={'custom'} options={{ mask: '99999' }} value={season04Edit} onChangeText={setSeason04} />
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 05" type={'custom'} options={{ mask: '99999' }} value={season05Edit} onChangeText={setSeason05} />
              </View>
              <View style={styles.seasons2}>
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 06" type={'custom'} options={{ mask: '99999' }} value={season06Edit} onChangeText={setSeason06} />
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 07" type={'custom'} options={{ mask: '99999' }} value={season07Edit} onChangeText={setSeason07} />
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 08" type={'custom'} options={{ mask: '99999' }} value={season08Edit} onChangeText={setSeason08} />
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 09" type={'custom'} options={{ mask: '99999' }} value={season09Edit} onChangeText={setSeason09} />
                <TextInputMask style={styles.input2} keyboardType='numeric' placeholder="Season 10" type={'custom'} options={{ mask: '99999' }} value={season10Edit} onChangeText={setSeason10} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={() => addEdit()}>
          <AntDesign name="edit" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onLongPress={() => deleteEdit()}>
          <AntDesign name="delete" size={30} color="#808080" />
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
    //marginTop: statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  window: {
    flex: 1,
    margin: 15,
    borderRadius: 11,
    borderColor: 'black',
    paddingBottom: 0,
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
    height: 30,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: '#B0C4DE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 0,
  },
  form: {
    flex: 1,
  },
  seasons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    marginStart: '10%',
    marginEnd: '10%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 10,
    paddingEnd: 10,
    borderRadius: 10,
    height: 45,
    justifyContent: 'center'
  },
  input2: {
    textAlign: 'center',
    backgroundColor: '#B0C4DE',
    marginTop: 5,
    marginBottom: 10,
    marginStart: '15%',
    marginEnd: '15%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 10,
    paddingEnd: 10,
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