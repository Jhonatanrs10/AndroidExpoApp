import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'//https://github.com/bhrott/react-native-masked-text
import { JhonatanrsAppAnimesDatabase } from './animeDatabase';
import styles from '../../styles/animeStyles'

export function AnimeManage({ closeWindow, item }) {

  const [barTitle, setBarTitle] = useState("New Anime");
  const [name, setName] = useState("");
  const [status, setStatus] = useState('Watching');
  const [release, setRelease] = useState('1-Monday');
  const [obs, setObs] = useState("");
  const [linkW, setlinkW] = useState("");
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

  useEffect(() => {
    if (item !== "empty") {
      setBarTitle('Edit Anime (ID:' + item.id + ')')
      setName(item.name);
      setStatus(item.status);
      setRelease(item.release);
      setObs(item.obs);
      setlinkW(item.linkW);
      setSeason01(item.season01);
      setSeason02(item.season02);
      setSeason03(item.season03);
      setSeason04(item.season04);
      setSeason05(item.season05);
      setSeason06(item.season06);
      setSeason07(item.season07);
      setSeason08(item.season08);
      setSeason09(item.season09);
      setSeason10(item.season10);
    }
  }, []);

  const changeStatus = () => {
    if (status == "Watching") {
      setStatus("Completed")
    } else {
      setStatus("Watching")
    }
  }

  const changeRelease = () => {
    if (release == "1-Monday") {
      setRelease("2-Tuesday")
    } else if (release == "2-Tuesday") {
      setRelease("3-Wednesday")
    } else if (release == "3-Wednesday") {
      setRelease("4-Thursday")
    } else if (release == "4-Thursday") {
      setRelease("5-Friday")
    } else if (release == "5-Friday") {
      setRelease("6-Saturday")
    } else if (release == "6-Saturday") {
      setRelease("7-Sunday")
    } else if (release == "7-Sunday") {
      setRelease("1-Monday")
    } else {
      setRelease("1-Monday")
    }
  }

  function deleteEdit() {
    Alert.alert('Delete (ID:' + item.id + ')', 'Are you sure about this choice?', [
      { text: "Yes,I'm sure!", onPress: () => deleteIdData(item.id) },
      { text: 'No', style: 'cancel', },]);
  }

  async function deleteIdData(valueId) {
    const response = await AsyncStorage.getItem(JhonatanrsAppAnimesDatabase);
    const data = response ? JSON.parse(response) : [];
    var animeAllData = [];
    for (var i = 0; i < data.length; i++) {
      if (valueId == data[i].id) {
        ToastAndroid.show('Excluido com Sucesso.', ToastAndroid.SHORT);
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
    AsyncStorage.setItem(JhonatanrsAppAnimesDatabase, JSON.stringify(animeAllData));
    closeWindow();
  }


  function addEdit() {
    editIdData(item.id)
  }


  async function editIdData(valueId) {
    const response = await AsyncStorage.getItem(JhonatanrsAppAnimesDatabase);
    const data = response ? JSON.parse(response) : [];
    var animeAllData = [];
    if (name == "") {
      alert("Name are required");
    } else if (name.indexOf("[") != -1 == true || name.indexOf("]") != -1 == true || obs.indexOf("[") != -1 == true || obs.indexOf("]") != -1 == true || linkW.indexOf("[") != -1 == true || linkW.indexOf("]") != -1 == true) {
      alert("Name, Obs and Link cannot have the characters ([) and (]) ");
    } else {
      for (var i = 0; i < data.length; i++) {
        if (valueId == data[i].id) {
          const animeData = {
            id: (data[i].id),
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
      AsyncStorage.setItem(JhonatanrsAppAnimesDatabase, JSON.stringify(animeAllData));
      ToastAndroid.show('Editado com sucesso', ToastAndroid.SHORT);
      closeWindow();
    }
  }

  async function salvarNew() {
    const response = await AsyncStorage.getItem(JhonatanrsAppAnimesDatabase);
    const data = response ? JSON.parse(response) : [];
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      count = data[i].id
    }
    const nextId = count + 1
    try {
      if (name == "") {
        alert("Name are required");
      } else if (name.indexOf("[") != -1 == true || name.indexOf("]") != -1 == true || obs.indexOf("[") != -1 == true || obs.indexOf("]") != -1 == true || linkW.indexOf("[") != -1 == true || linkW.indexOf("]") != -1 == true) {
        alert("Name, Obs and Link cannot have the characters ([) and (]) ");
      } else {
        const newData = {
          id: nextId,
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
        const response = await AsyncStorage.getItem(JhonatanrsAppAnimesDatabase);
        const previousData = response ? JSON.parse(response) : [];
        const data = [...previousData, newData];
        await AsyncStorage.setItem(JhonatanrsAppAnimesDatabase, JSON.stringify(data));//json string convert array para string
        ToastAndroid.show('Salvo com Sucesso.', ToastAndroid.SHORT);
        closeWindow();
      }
    } catch (error) {
      console.log(error);
      alert("Não foi possível cadastrar");
    }
  }
  const ViewDock = () => {
    if (item !== "empty") {
      return (
        <View style={styles.containerDockAnimes}>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDockAnimes} onPress={() => addEdit()}>
            <AntDesign name="edit" size={30} color="#808080" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDockAnimes} onLongPress={() => deleteEdit()}>
            <AntDesign name="delete" size={30} color="#808080" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDockAnimes} onPress={closeWindow}>
            <AntDesign name="back" size={30} color="#808080" />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.containerDockAnimes}>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDockAnimes} onPress={salvarNew}>
            <AntDesign name="save" size={30} color="#808080" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDockAnimes} onPress={closeWindow}>
            <AntDesign name="back" size={30} color="#808080" />
          </TouchableOpacity>
        </View>
      )
    }

  }

  return (
    <View style={styles.containerAnimes}>
      <StatusBar barStyle="default"/>
      <View style={styles.windowAnimes}>
        <View style={styles.barAnimesThin}>
          <Text style={styles.textBarAnimes}>{barTitle}</Text>
        </View>
        <View style={styles.formAnimes}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput style={styles.inputAnimes} marginTop={15} placeholder="Name" value={name} onChangeText={setName} />
            <TouchableOpacity activeOpacity={0.3} style={styles.inputAnimes} onPress={changeStatus}>
              <Text style={styles.textAlignCenter}>Status: {status}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={styles.inputAnimes} onPress={changeRelease}>
              <Text style={styles.textAlignCenter}>Release: {release.substring(2)}</Text>
            </TouchableOpacity>
            <TextInput style={styles.inputAnimes} placeholder="Obs" value={obs} onChangeText={setObs} />
            <TextInput style={styles.inputAnimes} placeholder="Link" value={linkW} onChangeText={setlinkW} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 01" type={'custom'} options={{ mask: '99999' }} value={season01} onChangeText={setSeason01} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 02" type={'custom'} options={{ mask: '99999' }} value={season02} onChangeText={setSeason02} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 03" type={'custom'} options={{ mask: '99999' }} value={season03} onChangeText={setSeason03} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 04" type={'custom'} options={{ mask: '99999' }} value={season04} onChangeText={setSeason04} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 05" type={'custom'} options={{ mask: '99999' }} value={season05} onChangeText={setSeason05} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 06" type={'custom'} options={{ mask: '99999' }} value={season06} onChangeText={setSeason06} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 07" type={'custom'} options={{ mask: '99999' }} value={season07} onChangeText={setSeason07} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 08" type={'custom'} options={{ mask: '99999' }} value={season08} onChangeText={setSeason08} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 09" type={'custom'} options={{ mask: '99999' }} value={season09} onChangeText={setSeason09} />
            <TextInputMask style={styles.inputAnimes} keyboardType='numeric' placeholder="Season 10" type={'custom'} options={{ mask: '99999' }} value={season10} onChangeText={setSeason10} />
          </ScrollView>
        </View>
      </View>
      <ViewDock />
    </View>
  )
}