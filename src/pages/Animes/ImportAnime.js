import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from './data';
import { ToastAndroid, Share } from 'react-native';

export function ImportAnime({closeWindow}) {

  const [dataForImport, setDataForImport] = useState(null);

  async function importData() {
    try {
      const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
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

        console.log(pAnimes[0] +' - ' + pAnimes[13] + ' - '+pAnimes[14])

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

        //console.log(inewData)

        if(pAnimes[14] == undefined){
          ToastAndroid.show('ERRO on import (ID:'+id+')', ToastAndroid.LONG);
        }else{
          const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
        const previousData = response ? JSON.parse(response) : [];
        const idata = [...previousData, inewData];
        await AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes", JSON.stringify(idata));
        //ToastAndroid.show('Importado com Sucesso.', ToastAndroid.SHORT);
        }

      }

      ToastAndroid.show('Importado.', ToastAndroid.SHORT);
      

    } catch (error) {

      console.log(error);
      //alert("Não foi possível importar");
      ToastAndroid.show('Não foi possível importar', ToastAndroid.SHORT);

    }

  }

 return (
  <View style={styles.containerImport}>
    <TextInput flex={1} backgroundColor={'#fff'} onChangeText={setDataForImport}></TextInput>
    <View style={styles.container2}>
      <TouchableOpacity activeOpacity={0.3} style={styles.buttonStyle} onPress={() => {importData(); closeWindow()}}>
        <Text style={styles.buttonText}>Import</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  containerImport: {
    flex: 1,
    backgroundColor: '#B0C4DE',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: '5%',
    paddingStart: '2%',
    paddingEnd: '2%'
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