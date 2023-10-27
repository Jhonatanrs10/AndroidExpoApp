import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import {ToastAndroid} from 'react-native'


const actions = {
  showMsg: function (msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  },
  exportData: async function () {
    const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
    const data = response ? JSON.parse(response) : [];
    var exportDataTxt = '';

    for (var i = 0; i < data.length; i++) {
      var exportData = '';
      exportData += (data[i].id) + ',';
      exportData += (data[i].name) + ',';
      exportData += (data[i].status) + ',';
      exportData += (data[i].release) + ',';
      exportData += (data[i].obs) + ',';
      exportData += (data[i].linkW) + ',';
      exportData += (data[i].season01) + ',';
      exportData += (data[i].season02) + ',';
      exportData += (data[i].season03) + ',';
      exportData += (data[i].season04) + ',';
      exportData += (data[i].season05) + ',';
      exportData += (data[i].season06) + ',';
      exportData += (data[i].season07) + ',';
      exportData += (data[i].season08) + ',';
      exportData += (data[i].season09) + ',';
      exportData += (data[i].season10);
      exportDataTxt += (exportData) + ';\n';
    }

    console.log(exportDataTxt)

    
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'database.txt', exportDataTxt);

    ToastAndroid.show('Exportado com Sucesso!!', ToastAndroid.SHORT);

  },
  importData: async function () {
    try {
      const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
      const data = response ? JSON.parse(response) : [];
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        count = data[i].id
      }
      const nextId = count + 1

      //var importDataTxt = 'TATE NO YUUSHA,Watching,Sunday,TOP,https://meuanime.io/epsonline/tate-no-yuusha-no-nariagari-3,24,,,,,,,,,;One Piece,Watching,Saturday,TOP,https://meuanime.io/epsonline/tate-no-yuusha-no-nariagari-3,1076,,,,,,,,,;';
      var importDataTxt = 'Segunda,Watching,7-Sunday,TOP,,,,,,,,,,,24;Segunda2,Watching,5-Friday,TOP,,,,,,,,,,,24;terça,Watching,2-Tuesday,TOP,,,,,,,,,,,24;';
      
      var animes = importDataTxt.split(';');

      for (var i = 0; i < animes.length - 1; i++) {

        const pAnimes = animes[i].split(',');
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

        //console.log(inewData)

        const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
        const previousData = response ? JSON.parse(response) : [];
        const idata = [...previousData, inewData];

        await AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes", JSON.stringify(idata));


      }

     // alert("Importado com Sucesso.");
     ToastAndroid.show('Importado com Sucesso.', ToastAndroid.SHORT);

    } catch (error) {

      console.log(error);
      //alert("Não foi possível importar");
      ToastAndroid.show('Não foi possível importar', ToastAndroid.SHORT);

    }

  },
}
export default actions;