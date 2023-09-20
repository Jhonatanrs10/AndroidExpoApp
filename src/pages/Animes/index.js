import { StyleSheet, Text, View, StatusBar, TouchableOpacity,Modal, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { Cadastro } from '../Cadastro';
import { Editar } from '../Editar';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusBarHeight = StatusBar.currentHeight;

export function Animes() {
  const [data, setData] = useState("");

  async function mostrarData() {
    const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
    const data = response ? JSON.parse(response) : [];
    setData(data);
    for (var i=0; i < data.length; i++) {

      console.log(data[i].name); 

      
    }

  }
  
//////////
async function deleteData(){
  const response = await AsyncStorage.removeItem("@JhonatanrsAndroidExpoApp:Animes");

  alert("Database DELETADO");
}

async function exportData(){
  const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
  const data = response ? JSON.parse(response) : [];
  setData(data);
  var exportDataTxt = '';
  for (var i=0; i < data.length; i++) {
    var exportData = '';
    exportData += (data[i].id)+',';
    exportData += (data[i].name)+',';
    exportData += (data[i].status)+',';
    exportData += (data[i].release)+',';
    exportData += (data[i].episode);
    exportDataTxt += (exportData)+';\n';
  }

  console.log(exportDataTxt)
  alert("Exportado no console com Sucesso.");

}


async function importData(){

    var importDataTxt = '1,One Piece,Currently Watching,Sunday,1076;2,Charlotte,Completed,-,13;3,Prison School,Completed,-,12;4,Shokugeki no Souma,Completed,-,86;5,Overlord,Completed,-,52;6,Owari no Seraph,Completed,-,24;7,Naruto Classico,Completed,-,220;8,Naruto Shippuden,Completed,-,500;9,Kuusen Madoushi Kouhosei no Kyoukan,Completed,-,12;10,God Eater,Completed,-,13;11,Rokka no Yuusha,Completed,-,12;12,High School DxD,Completed,-,49;13,Shinmai Maou no Testament,Completed,-,22;14,No Game No Life,Completed,-,12;15,Tokyo Ghoul,Completed,-,48;16,Kiss x Sis,Completed,-,12;17,Absolute Duo,Completed,-,12;18,Another,Completed,-,12;19,Trinity Seven,Completed,-,12;20,Highschool of the Dead,Completed,-,12;21,Hagure Yuusha No Estetica,Completed,-,12;22,Zero no Tsukaima,Completed,-,49;23,Yamada-kun to 7-nin no Majo,Completed,-,12;24,Ao Haru Ride,Completed,-,12;25,Nisekoi,Completed,-,33;26,Deadman Wonderland,Completed,-,12;27,Shingeki no Kyojin,Completed,-,88;28,Yu Yu Hakusho,Completed,-,112;29,Cross Ange,Completed,-,25;30,Sword Art Online,Completed,-,98;31,Sword Art Online Alternative: Gun Gale Online,Completed,-,13;32,To Aru Majutsu no Index,Completed,-,74;33,Mirai Nikki,Completed,-,26;34,Dungeon Ni Deai Wo Motomeru No Wa Machigatteiru No Darou Ka (Danmachi),Completed,-,59;35,Death Note,Completed,-,37;';
    var animes = importDataTxt.split(';');

    try{
      
      for (var i=0; i < animes.length; i++) {
      
       

        const pAnimes = animes[i].split(',');
        const id = pAnimes[0];
        const name = pAnimes[1];
        const status = pAnimes[2];
        const release = pAnimes[3];
        const episode= pAnimes[4];

        const inewData = {
          id,
          name,
          status,
          release,
          episode
        }
        

        const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
        const previousData = response ? JSON.parse(response) : [];
        const idata = [...previousData, inewData];
  
        await AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes",JSON.stringify(idata));
  
     
    }

  alert("Importado com Sucesso.");
  
  }catch(error){

    console.log(error);
    alert("Não foi possível importar");

  }
  
}

//////////


  const [pageCadastro, setPageCadastro] = useState(false);
  const [pageEditar, setPageEditar] = useState(false);

  function abrirPageCadastro(){
    setPageCadastro(true);
  }

  function abrirPageEditar(){
    setPageEditar(true);
  }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
   
        <Text style={styles.contentText} backgroundColor={'red'} onPress={abrirPageCadastro} closeWindow={() => setPageEditar(false)}>OLAAA</Text>

      </ScrollView>

      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirPageCadastro}>
          <AntDesign name="pluscircleo" size={30} color="#808080"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={importData}>
          <AntDesign name="up" size={30} color="#808080"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={exportData}>
          <AntDesign name="download" size={30} color="#808080"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={deleteData}>
          <AntDesign name="delete" size={30} color="#808080"/>
        </TouchableOpacity>
      </View>




      <Modal visible={pageCadastro} animationType="fade">
        <Cadastro closeWindow={() => setPageCadastro(false)}/>
      </Modal>
      <Modal visible={pageEditar} animationType="fade" transparent={true}>
        <Editar closeWindow={() => setPageEditar(false)}/>
      </Modal>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#C0C0C0'
  },
  content:{
    flex: 1,
    backgroundColor: '#fff',
   
  },
  containerDock:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    height:70,
    marginBottom: 15,
    marginStart: 15,
    marginEnd: 15,
    borderRadius: 15,
    backgroundColor: '#B0C4DE',
    alignItems: 'center',
},
buttonsDock:{
    padding:5,
    backgroundColor: '#fff',
    borderRadius: 13,
},
contentText:{
    marginTop: 10,
    marginStart: 'auto',
    marginEnd: 'auto'
}
})
