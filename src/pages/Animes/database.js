import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Alert, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import styles from '../../styles/styles'

///DATABASE KEYS///
export const JhonatanrsAppDatabase = "@JhonatanrsAndroidExpoApp:Animes"
///////////////////

export function Database({ closeWindow }) {

  const [dataForImport, setDataForImport] = useState(null);

  function abrirDelete() {
    Alert.alert('Delete database ('+JhonatanrsAppDatabase.substring(26)+')', 'Are you sure about this choice?', [
      { text: "Yes,I'm sure!", onPress: () => deleteAllData() },
      { text: 'No', style: 'cancel', },]);
  }

  async function deleteAllData() {

    await AsyncStorage.removeItem(JhonatanrsAppDatabase);
    ToastAndroid.show('Database ('+JhonatanrsAppDatabase.substring(26)+') deleted.', ToastAndroid.SHORT);
    closeWindow();
  }

  async function importData() {
    try {
      const response = await AsyncStorage.getItem(JhonatanrsAppDatabase);
      const data = response ? JSON.parse(response) : [];
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        count = data[i].id
      }

      const nextId = count + 1

      var importDataTxt = dataForImport
  
      var animes = importDataTxt.split(']');

      for (var i = 0; i < animes.length - 1; i++) {

        const pAnimes = animes[i].split('[');
        const id = nextId + i;
        const name = pAnimes[0];
        const status = pAnimes[1];
        const release = pAnimes[2];
        const obs = pAnimes[3];
        const linkW = pAnimes[4];
        const season01 = pAnimes[5];
        const season02 = pAnimes[6];
        const season03 = pAnimes[7];
        const season04 = pAnimes[8];
        const season05 = pAnimes[9];
        const season06 = pAnimes[10];
        const season07 = pAnimes[11];
        const season08 = pAnimes[12];
        const season09 = pAnimes[13];
        const season10 = pAnimes[14];

        const inewData = {
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

        if (pAnimes[14] == undefined) {
          ToastAndroid.show('ERRO on import (ID:' + id + ')', ToastAndroid.LONG);
        } else {
          const response = await AsyncStorage.getItem(JhonatanrsAppDatabase);
          const previousData = response ? JSON.parse(response) : [];
          const idata = [...previousData, inewData];
          await AsyncStorage.setItem(JhonatanrsAppDatabase, JSON.stringify(idata));
          ToastAndroid.show('Imported.', ToastAndroid.SHORT);          
        }

      }

     
    } catch (error) {

      console.log(error);
      ToastAndroid.show('Unable to import.', ToastAndroid.SHORT);
    }

    closeWindow()

  }

  async function exportData() {
    const response = await AsyncStorage.getItem(JhonatanrsAppDatabase);
    const data = response ? JSON.parse(response) : [];
    var exportDataTxt = '';

    for (var i = 0; i < data.length; i++) {
      var exportData = '';
      exportData += (data[i].id) + '[';
      exportData += (data[i].name) + '[';
      exportData += (data[i].status) + '[';
      exportData += (data[i].release) + '[';
      exportData += (data[i].obs) + '[';
      exportData += (data[i].linkW) + '[';
      exportData += (data[i].season01) + '[';
      exportData += (data[i].season02) + '[';
      exportData += (data[i].season03) + '[';
      exportData += (data[i].season04) + '[';
      exportData += (data[i].season05) + '[';
      exportData += (data[i].season06) + '[';
      exportData += (data[i].season07) + '[';
      exportData += (data[i].season08) + '[';
      exportData += (data[i].season09) + '[';
      exportData += (data[i].season10);
      exportDataTxt += (exportData) + ']\n';
    }
      try {
        const result = await Share.share({
          message: ('AnimesData\n\nid[name[status[release[obs[linkW[season01[season02[season03[season04[season05[season06[season07[season08[season09[season10]' + '\n' + exportDataTxt),
          
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log('shared with activity type of: ', result.activityType)
          } else {
            console.log('shared')
          }
        } else if (result.action === Share.dismissedAction) {
          console.log('dismissed')
        }
      } catch (error) { 
        console.log(error.message)
      } 
  }

  return (

    <View style={styles.containerIndex}>
      <View style={styles.window}>
        <View style={styles.barThin}>
          <Text style={styles.textBar}>Database</Text>
        </View>
        <View style={styles.form}>
          <TextInput multiline={true} placeholder={'Insert data for import\n\nname[status[release[obs[linkW\n[season01[season02[season03[season04[season05\n[season06[season07[season08[season09[season10]'} maxLength={99999999} onChangeText={setDataForImport}></TextInput>
        </View>
      </View>
      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={importData}>
          <MaterialCommunityIcons name="database-import-outline" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={exportData}>
          <MaterialIcons name="add-to-drive" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onLongPress={abrirDelete}>
          <AntDesign name="delete" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={closeWindow}>
          <AntDesign name="back" size={30} color="#808080" />
        </TouchableOpacity>
      </View>
    </View>

  )
}