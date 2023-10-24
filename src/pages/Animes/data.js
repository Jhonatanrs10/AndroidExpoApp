import AsyncStorage from '@react-native-async-storage/async-storage';


const actions = {
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
      exportData += (data[i].linkAssistir) + ',';
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


    //console.log(data.length)
    alert("Exportado no console com Sucesso.");

  },
  deleteIdData: async function (valueId) {
    const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
    const data = response ? JSON.parse(response) : [];
    var animeAllData = [];

    for (var i = 0; i < data.length; i++) {
      if (valueId == data[i].id) {
        alert("Excluido com Sucesso.");
      } else {
        const id = (data[i].id);
        const name = (data[i].name);
        const status = (data[i].status);
        const release = (data[i].release);
        const obs = (data[i].obs);
        const linkAssistir = (data[i].linkAssistir);
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
        animeAllData.push(animeData)
      }
    }

    //console.log(JSON.stringify(animeAllData))

    AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes", JSON.stringify(animeAllData));

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

      var importDataTxt = 'TATE NO YUUSHA,Watching,Sunday,TOP,https://meuanime.io/epsonline/tate-no-yuusha-no-nariagari-3,24,,,,,,,,,;One Piece,Watching,Saturday,TOP,https://meuanime.io/epsonline/tate-no-yuusha-no-nariagari-3,1076,,,,,,,,,;';
      var animes = importDataTxt.split(';');


      

      for (var i = 0; i < animes.length - 1; i++) {
        
        const pAnimes = animes[i].split(',');
        const id = nextId + i;
        const name = pAnimes[0];
        const status = pAnimes[1];
        const release = pAnimes[2];
        const obs = pAnimes[3];
        const linkAssistir = pAnimes[4];
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

        //console.log(inewData)

        const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
        const previousData = response ? JSON.parse(response) : [];
        const idata = [...previousData, inewData];

        await AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes", JSON.stringify(idata));


      }

      alert("Importado com Sucesso.");

    } catch (error) {

      console.log(error);
      alert("Não foi possível importar");

    }

  },
}
export default actions;