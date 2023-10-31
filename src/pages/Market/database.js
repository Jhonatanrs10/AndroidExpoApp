import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Alert, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import styles from '../../styles/styles'

///DATABASE KEYS///
export const JhonatanrsAppDatabase = "@JhonatanrsAndroidExpoApp:Market"
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
  
      var Itens = importDataTxt.split(']');

      for (var i = 0; i < Itens.length - 1; i++) {

        const pItens = Itens[i].split('[');
        const id = nextId + i;
        const product = pItens[0];
        const amount = pItens[1];
        const value = pItens[2];
        const date = pItens[3];
        const inewData = {
          id,
          product,
          amount,
          value,
          date
        }

        if (pItens[6] == undefined) {
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
      exportData += '[' + (data[i].id) + '[';
      exportData += (data[i].product) + '[';
      exportData += (data[i].amount) + '[';
      exportData += (data[i].value) + '[';
      exportData += (data[i].date);
      exportDataTxt += (exportData) + ']\n';
    }
      try {
        const result = await Share.share({
          message: ('ItensData\n\nid[product[amount[value[date]' + '\n' + exportDataTxt),
          
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
          <Text style={styles.textBar}>Anime Database</Text>
        </View>
        <View style={styles.form}>
          <TextInput multiline={true} placeholder={'Insert data for import\n\nproduct[amount[value[date]'} maxLength={99999999} onChangeText={setDataForImport}></TextInput>
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